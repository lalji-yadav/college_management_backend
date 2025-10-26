import { Module } from '@nestjs/common';
import { StudentAuthService } from './student-auth.service';
import { StudentAuthController } from './student-auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule, Student, StudentSchema } from '@app/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn }}),
    CommonModule, // shared DB connection
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentAuthController],
  providers: [StudentAuthService,JwtStrategy],
  exports: [StudentAuthService, JwtModule]
})
export class StudentAuthModule {}