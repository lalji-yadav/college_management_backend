import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CourseSchema,Course, Subject } from '@app/common';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  // Create Subject safely
  async createSubject(dto: CreateSubjectDto): Promise<Subject> {
    if (!dto.courseId) {
      throw new BadRequestException('Course ID is required');
    }

    if (!Types.ObjectId.isValid(dto.courseId)) {
      throw new BadRequestException('Invalid Course ID format');
    }

    const courseExists = await this.courseModel.findById(dto.courseId);
    if (!courseExists) {
      throw new NotFoundException('Course not found');
    }

    // Create and save subject
    const created = new this.subjectModel({
      name: dto.name,
      description: dto.description,
      courseId: new Types.ObjectId(dto.courseId),
    });

    return created.save();
  }

  //  Get All Subjects
  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectModel.find().populate('courseId', 'name').exec();
  }

  //  Get Subject By ID
  async getSubjectById(id: string): Promise<Subject> {
    const subject = await this.subjectModel.findById(id).populate('courseId', 'name').exec();
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  //  Update Subject
  async updateSubject(id: string, dto: UpdateSubjectDto): Promise<Subject> {
    const updated = await this.subjectModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Subject not found');
    return updated;
  }

  //  Delete Subject
  async deleteSubject(id: string): Promise<{ message: string }> {
    const deleted = await this.subjectModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Subject not found');
    return { message: 'Subject deleted successfully' };
  }
}
