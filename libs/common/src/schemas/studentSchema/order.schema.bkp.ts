// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class Order extends Document {
//   @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
//   studentId: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
//   courseId: Types.ObjectId;

//   @Prop({ required: true })
//   amount: number;

//   @Prop({
//     type: String,
//     enum: ['pending', 'success', 'failed'],
//     default: 'pending',
//   })
//   paymentStatus: string;

//   @Prop({
//     type: String,
//     enum: ['razorpay', 'upi', 'stripe'],
//     required: true,
//   })
//   paymentMode: string;

//   @Prop({ required: true })
//   transactionId: string;

//   @Prop({ default: Date.now })
//   purchasedAt: Date;

//   @Prop()
//   validTill: Date;
// }

// export const OrderSchema = SchemaFactory.createForClass(Order);
