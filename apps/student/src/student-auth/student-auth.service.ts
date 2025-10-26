import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateStudentDto, UpdateStudentDto,LoginDto } from './dto/student.dto';
import { Student } from '@app/common';



@Injectable()
export class StudentAuthService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    private readonly jwtService: JwtService,
  ) {}

  //  Student Signup
  async createStudent(dto: CreateStudentDto) {
    const existing = await this.studentModel.findOne({ email: dto.email });
    if (existing) throw new BadRequestException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const student = await this.studentModel.create({
      ...dto,
      password: hashed,
    });

    return { message: 'Signup successful', student };
  }

  //  Student Login
  async login(dto: LoginDto) {
    const student = await this.studentModel.findOne({ email: dto.email });
    if (!student) throw new NotFoundException('Student not found');

    const isMatch = await bcrypt.compare(dto.password, student.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ id: student._id, email: student.email });
    return {
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
      },
    };
  }

  //  Get Student By ID
  async getStudentById(id: string) {
    const student = await this.studentModel.findById(id).select('-password');
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  //  Update Student
  async updateStudent(id: string, dto: UpdateStudentDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    const updated = await this.studentModel.findByIdAndUpdate(id, dto, { new: true }).select('-password');
    if (!updated) throw new NotFoundException('Student not found');
    return { message: 'Profile updated', student: updated };
  }

  //  Delete Student
  async deleteStudent(id: string) {
    const deleted = await this.studentModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Student not found');
    return { message: 'Account deleted successfully' };
  }


}

