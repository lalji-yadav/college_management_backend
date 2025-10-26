import { Controller, Post, Get, Body, Req, ForbiddenException } from '@nestjs/common';
import { StudentAuthService } from './student-auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateStudentDto, UpdateStudentDto, IdDto,LoginDto } from './dto/student.dto';


@Controller('/api/student')
export class StudentAuthController {
  constructor(
    private readonly studentAuthService: StudentAuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('studentSignup')
  async signup(@Body() dto: CreateStudentDto) {
    return this.studentAuthService.createStudent(dto);
  }

  @Post('studentLogin')
  async login(@Body() dto: LoginDto) {
    return this.studentAuthService.login(dto);
  }

  @Post('getStudentById')
  async getById(@Body() dto: IdDto, @Req() req: any) {
    this.verifyToken(this.extractToken(req));
    return this.studentAuthService.getStudentById(dto.id);
  }

  @Post('updateStudent')
  async update(@Body() dto: UpdateStudentDto & IdDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (user.id !== dto.id) throw new ForbiddenException('You can only update your own profile');
    const { id, ...updateData } = dto;
    return this.studentAuthService.updateStudent(id, updateData);
  }

  @Post('deleteStudent')
  async delete(@Body() dto: IdDto, @Req() req: any) {
    const user = this.verifyToken(this.extractToken(req));
    if (user.id !== dto.id) throw new ForbiddenException('You can only delete your own account');
    return this.studentAuthService.deleteStudent(dto.id);
  }

  private extractToken(req: any): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('Missing Authorization header');
    const token = authHeader.split(' ')[1];
    if (!token) throw new ForbiddenException('Token missing');
    return token;
  }

  private verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new ForbiddenException('Invalid or expired token');
    }
  }


}


