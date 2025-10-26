// subject.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Course } from './course.schema';


@Schema({ timestamps: true })
export class Subject extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  // Course reference (Each subject belongs to a course)
  // @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  // courseId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  courseId: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
