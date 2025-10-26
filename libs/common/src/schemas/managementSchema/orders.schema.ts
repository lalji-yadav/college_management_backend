import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['pending', 'success', 'failed'] })
  paymentStatus: string;

  @Prop({ required: true, enum: ['razorpay', 'upi', 'stripe'] })
  paymentMode: string;

  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  purchasedAt: Date;

  @Prop({ required: true })
  validTill: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
