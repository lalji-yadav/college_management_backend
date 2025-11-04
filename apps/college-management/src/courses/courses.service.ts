import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/create-course.dto';
import { Course } from '@app/common';


@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  // Create
  async createCourse(dto: CreateCourseDto): Promise<Course> {

    try {

      console.log("dto--->", dto)

      const course = new this.courseModel(dto);

      console.log('courser data', course)

    return course.save();
      
    } catch (error) {

      console.log('error data--->', error)
      return error
      
    }
    
  }

  // List all
  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // Get by ID
  async getCourseById(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  // Update
  async updateCourse(id: string, dto: UpdateCourseDto): Promise<Course> {
    const updated = await this.courseModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Course not found');
    return updated;
  }

  // Delete
  async deleteCourse(id: string): Promise<{ deleted: boolean }> {
    const res = await this.courseModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Course not found');
    return { deleted: true };
  }


}

