import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum PaymentMode {
  RAZORPAY = 'razorpay',
  UPI = 'upi',
  STRIPE = 'stripe',
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

// DTO for creating a new order
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly courseId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  readonly transactionId: string;

  @IsEnum(PaymentMode)
  readonly paymentMode: PaymentMode;

  @IsEnum(PaymentStatus)
  @IsOptional()
  readonly paymentStatus?: PaymentStatus; // default can be set in service as 'pending'
}

// DTO for updating order payment status
export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsEnum(PaymentStatus)
  readonly paymentStatus: PaymentStatus;
}

