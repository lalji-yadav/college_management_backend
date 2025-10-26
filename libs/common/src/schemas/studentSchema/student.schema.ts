import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // hashed using bcrypt

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  purchasedCourses: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);

