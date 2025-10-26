// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class Student extends Document {
//   @Prop({ required: true }) name: string;
//   @Prop({ required: true, unique: true }) email: string;
//   @Prop() mobile?: string;
// }

// export const StudentSchema = SchemaFactory.createForClass(Student);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  purchasedCourses: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
