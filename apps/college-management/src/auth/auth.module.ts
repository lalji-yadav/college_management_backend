import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule, Admin, AdminSchema } from '@app/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn }}),
    CommonModule, // shared DB connection
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService, JwtModule]

})
export class AuthModule {}
