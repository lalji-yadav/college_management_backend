import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } }) // only createdAt
export class Course extends Document {
  @Prop({ required: true })
  name: string; // e.g. "NEET Complete Course"

  @Prop({ required: true, enum: ['school', 'competitive'] })
  type: string; // "school" / "competitive"

  @Prop({ required: true })
  price: number; // e.g. 4999

  @Prop()
  description: string; // short detail of course

  @Prop({ required: true })
  durationInDays: number; // e.g. 180

  @Prop({ default: true })
  isActive: boolean; // true = visible to students
}

export const CourseSchema = SchemaFactory.createForClass(Course);
