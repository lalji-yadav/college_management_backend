import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { ProfileModule } from './profile/profile.module';
import { CoursesModule } from './courses/courses.module';
import { OrdersModule } from './orders/orders.module';
import { ContentsModule } from './contents/contents.module';
import { NotificationsModule } from './notifications/notifications.module';
import { StudentAuthModule } from './student-auth/student-auth.module';


@Module({
  imports: [ProfileModule, CoursesModule, OrdersModule, ContentsModule, NotificationsModule, StudentAuthModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
