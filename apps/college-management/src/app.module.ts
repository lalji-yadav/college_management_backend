import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ContentsModule } from './contents/contents.module';
import { OrdersModule } from './orders/orders.module';
import { StudentsModule } from './students/students.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReportsAnalyticsModule } from './reports-analytics/reports-analytics.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OfflineCourseModule } from './offline-course/offline-course.module';


@Module({
  imports: [AuthModule, CoursesModule, SubjectsModule, ContentsModule, OrdersModule,
     StudentsModule, NotificationsModule, ReportsAnalyticsModule, OfflineCourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
