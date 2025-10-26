import { IsString, IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsNumber()
  amount: number;

  @IsEnum(['pending', 'success', 'failed'])
  paymentStatus: 'pending' | 'success' | 'failed';

  @IsEnum(['razorpay', 'upi', 'stripe'])
  paymentMode: 'razorpay' | 'upi' | 'stripe';

  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsDateString()
  purchasedAt: Date;

  @IsDateString()
  validTill: Date;
}

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(['pending', 'success', 'failed'])
  paymentStatus?: 'pending' | 'success' | 'failed';
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
