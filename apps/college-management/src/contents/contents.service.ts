import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateContentDto, UpdateContentDto } from './dto/contents.dto';
import { Content,Subject,Course } from '@app/common';


@Injectable()
export class ContentsService {
    constructor(
        @InjectModel(Content.name) private contentModel: Model<Content>,
        @InjectModel(Course.name) private courseModel: Model<Course>, 
        @InjectModel(Subject.name) private subjectModel: Model<Subject>, 
    ) { }

    //  Updated createContent function
    async createContent(dto: CreateContentDto): Promise<Content> {
        if (!Types.ObjectId.isValid(dto.courseId) || !Types.ObjectId.isValid(dto.subjectId)) {
            throw new BadRequestException('Invalid courseId or subjectId format');
        }

        // Check if course exists
        const course = await this.courseModel.findById(dto.courseId);
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        // Check if subject exists
        const subject = await this.subjectModel.findById(dto.subjectId);
        if (!subject) {
            throw new NotFoundException('Subject not found');
        }

        // If both exist, then create content
        const created = new this.contentModel({
            ...dto,
            courseId: new Types.ObjectId(dto.courseId),
            subjectId: new Types.ObjectId(dto.subjectId),
        });
        return created.save();
    }

    //  Get All
    async getAllContents(): Promise<Content[]> {
        return this.contentModel
            .find()
            .populate('courseId', 'name')
            .populate('subjectId', 'name')
            .sort({ createdAt: -1 });
    }

    //  Get by ID
    async getContentById(id: string): Promise<Content> {
        const content = await this.contentModel.findById(id)
            .populate('courseId', 'name')
            .populate('subjectId', 'name');

        if (!content) throw new NotFoundException('Content not found');
        return content;
    }

    //  Update
    async updateContent(id: string, dto: UpdateContentDto): Promise<Content> {
        const updated = await this.contentModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated) throw new NotFoundException('Content not found');
        return updated;
    }

    //  Delete
    async deleteContent(id: string): Promise<any> {
        const deleted = await this.contentModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Content not found');
        return { message: 'Content deleted successfully' };
    }

}

