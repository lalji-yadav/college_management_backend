import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Admin } from '@app/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService) { }

  async signup(createAdminDto: CreateAdminDto) {
    const { name, email, password, role } = createAdminDto;

    console.log('data----->', createAdminDto)

    const existing = await this.adminModel.findOne({ email });
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new this.adminModel({
      name,
      email,
      password: hashedPassword,
      role
    });

    return admin.save();
  }

  // signin and generate token and auto login 
  async signup1(createAdminDto: CreateAdminDto) {
    const { name, email, password, role } = createAdminDto;

    // Check if email already exists
    const existing = await this.adminModel.findOne({ email });
    if (existing) throw new ConflictException('Email already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin in DB
    const admin = new this.adminModel({
      name,
      email,
      password: hashedPassword,
      role
    });

    await admin.save();

    // ----- Auto login after signup -----
    const payload = { id: admin._id, email: admin.email, role: admin.role };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      access_token: token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      expiresIn: 3600, // 1 hour
    };
  }

  // Email aur password check karo
  async validateAdmin(email: string, password: string) {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) throw new UnauthorizedException('Invalid email or password');

    // console.log("admin login data-------->", admin)

    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    return admin;
  }

  // Token generate karne ka method
  async login(loginDto: LoginDto) {

    const { email, password } = loginDto;
    const admin = await this.validateAdmin(email, password);

    const payload = { id: admin._id, email: admin.email, role: admin.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async findAll() {
    return this.adminModel.find();
  }

}
