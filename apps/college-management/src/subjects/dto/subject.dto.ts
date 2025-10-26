import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

//
//  Create Subject DTO
//
export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Subject name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Course ID is required' })
  courseId: string;
}

//
//  Update Subject DTO
//
export class UpdateSubjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  courseId?: string;

  @IsOptional()
  isActive?: boolean;
}

//
//  Delete Subject DTO
//
export class IdDto {
  @IsString()
  @IsNotEmpty({ message: 'ID is required' })
  id: string;
}

