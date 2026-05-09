import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsEnum(['client', 'freelancer', 'admin']) role: 'client' | 'freelancer' | 'admin';
}

export class LoginDto {
  @IsEmail() email: string;
  @IsString() password: string;
}
