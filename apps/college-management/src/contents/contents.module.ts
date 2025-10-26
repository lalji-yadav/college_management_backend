import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { JwtModule } from '@nestjs/jwt';
import { ContentSchema, Content,Course,CourseSchema,Subject,SubjectSchema } from '@app/common';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema },
      { name: Course.name, schema: CourseSchema },       // ✅ Add Course
      { name: Subject.name, schema: SubjectSchema },     // ✅ Add Subject
    ]),
   
    JwtModule.register({ secret: 'laljiyadav', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}

