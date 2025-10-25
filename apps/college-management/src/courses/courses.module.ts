import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { CourseSchema, Course } from '@app/common';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({ secret: 'mySecretKey', signOptions: { expiresIn: '7d' } }),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CoursesModule { }
