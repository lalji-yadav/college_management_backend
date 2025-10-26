import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, Matches } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  readonly name: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  readonly password: string;

  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit Indian phone number.' })
  readonly phone: string;
}

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @IsOptional()
  password?: string;

  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit Indian phone number.' })
  @IsOptional()
  readonly phone?: string;
}

export class IdDto {
  @IsString()
  @IsNotEmpty({ message: 'ID is required.' })
  readonly id: string;
}

export class LoginDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
}