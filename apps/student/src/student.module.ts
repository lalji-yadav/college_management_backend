import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CoursesModule } from './courses/courses.module';
import { OrdersModule } from './orders/orders.module';
import { ContentsModule } from './contents/contents.module';
import { StudentModule } from './student/student.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, ProfileModule, CoursesModule, OrdersModule, ContentsModule, StudentModule, NotificationsModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
