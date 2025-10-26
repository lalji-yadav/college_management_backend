import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['video', 'pdf', 'quiz', 'test'])
  type: string;

  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  isFree?: boolean;
}

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(['video', 'pdf', 'quiz', 'test'])
  @IsOptional()
  type?: string;

  // @IsString()
  // @IsOptional()
  // subjectId?: string;

  // @IsString()
  // @IsOptional()
  // courseId?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  isFree?: boolean;
}

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
