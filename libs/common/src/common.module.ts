import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI)],

  // MongooseModule.forRoot(process.env.MONGO_URI),
  // export so other modules can use it
  providers: [CommonService],
  exports: [CommonService,MongooseModule],
})
export class CommonModule {}
