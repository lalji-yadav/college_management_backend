import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } }) // only createdAt
export class OfflineCourse extends Document {
  @Prop({ required: true })
  courseName: string; // e.g. "NEET Foundation 2025"

  @Prop({ required: true })
  courseDuration: number; // e.g. 180 (in days)

  @Prop({ required: true })
  totalFee: number; // e.g. 4999 (total fee of the course)

  @Prop()
  oneTimePaymentFee: number; // discounted fee for one-time payment

  @Prop()
  courseTotalTest: number; // e.g. total number of tests included

  @Prop({ required: true })
  courseIsActive: boolean; // true = visible to students
}

export const OfflineCourseSchema = SchemaFactory.createForClass(OfflineCourse);
