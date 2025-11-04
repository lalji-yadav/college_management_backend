import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfflineCourseService } from './offline-course.service';
import { OfflineCourseController } from './offline-course.controller';
import { OfflineCourse, OfflineCourseSchema } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({secret: 'laljiyadav',signOptions: { expiresIn: '7d' }}),
    MongooseModule.forFeature([
      { name: OfflineCourse.name, schema: OfflineCourseSchema },
    ]),
  ],
  controllers: [OfflineCourseController],
  providers: [OfflineCourseService],
})
export class OfflineCourseModule {}

