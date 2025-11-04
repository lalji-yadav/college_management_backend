import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOfflineCourseDto {
  @IsString()
  courseName: string;

  @IsNumber()
  courseDuration: number;

  @IsNumber()
  totalFee: number;

  @IsOptional()
  @IsNumber()
  oneTimePaymentFee?: number;

  @IsOptional()
  @IsNumber()
  courseTotalTest?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateOfflineCourseDto extends PartialType(CreateOfflineCourseDto) {}
