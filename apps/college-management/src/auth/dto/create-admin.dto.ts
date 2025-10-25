import { AdminRole } from '@app/common/enums/admin-role.enum';
import { IsEmail, IsNotEmpty, MinLength,IsEnum } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(AdminRole)
  role: AdminRole;

}
