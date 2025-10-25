import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsEnum(['school', 'competitive'])
  type: 'school' | 'competitive';

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(1)
  durationInDays: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}


export class IdDto {
  @IsMongoId()
  id: string;
}


export class UpdateCourseDto extends PartialType(CreateCourseDto) {}

