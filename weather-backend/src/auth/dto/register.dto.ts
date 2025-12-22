import { IsEmail, MinLength, IsString, IsIn, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role)
    role: Role;
}