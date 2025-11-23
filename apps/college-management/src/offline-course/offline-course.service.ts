import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { OfflineCourse } from './schemas/offline-course.schema';
import { CreateOfflineCourseDto, UpdateOfflineCourseDto } from './dto/create-offline-course.dto';
import { OfflineCourse } from '@app/common';

@Injectable()
export class OfflineCourseService {
  constructor(
    @InjectModel(OfflineCourse.name)
    private readonly offlineCourseModel: Model<OfflineCourse>,
  ) {}

  // Create Course
  async createCourse(dto: CreateOfflineCourseDto): Promise<OfflineCourse> {
    try {

    const course = new this.offlineCourseModel(dto);

    console.log('course---', course)
    return course.save();
      
    } catch (error) {

      return error
      
    }
  }

  // Get All
  async getAllCourses(): Promise<OfflineCourse[]> {
    return this.offlineCourseModel.find().sort({ createdAt: -1 }).exec();
  }

  // Get by ID
  async getCourseById(id: string): Promise<OfflineCourse> {
    const course = await this.offlineCourseModel.findById(id).exec();
    if (!course) throw new NotFoundException('Offline course not found');
    return course;
  }

  // Update
  async updateCourse(id: string, dto: UpdateOfflineCourseDto): Promise<OfflineCourse> {
    const updated = await this.offlineCourseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Offline course not found');
    return updated;
  }

  // Delete
  async deleteCourse(id: string): Promise<{ message: string }> {
    const result = await this.offlineCourseModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Offline course not found');
    return { message: 'Offline course deleted successfully' };
  }
}
