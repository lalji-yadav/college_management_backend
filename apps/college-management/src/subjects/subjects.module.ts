import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { CourseSchema,Course, Subject, SubjectSchema } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema },
    {name: Course.name, schema: CourseSchema },
  ]),
  JwtModule.register({secret: 'laljiyadav', signOptions: { expiresIn: '1d' }}),
],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule { }
