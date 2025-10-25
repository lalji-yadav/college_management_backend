import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Admin } from '@app/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) { }

    async signup(createAdminDto: CreateAdminDto) {
        const { name, email, password,role } = createAdminDto;

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

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const admin = await this.adminModel.findOne({ email });
        if (!admin) throw new UnauthorizedException('Invalid email or password');

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) throw new UnauthorizedException('Invalid email or password');

        // You can later return JWT here
        return { message: 'Login successful', admin };
    }

    async findAll() {
        return this.adminModel.find();
    }

}

