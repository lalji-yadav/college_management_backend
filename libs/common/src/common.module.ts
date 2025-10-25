import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/coachingManagement')],
  // export so other modules can use it
  providers: [CommonService],
  exports: [CommonService,MongooseModule],
})
export class CommonModule {}
