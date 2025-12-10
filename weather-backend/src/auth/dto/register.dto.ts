import { IsEmail, MinLength, IsString, IsIn, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsIn(['user', 'admin'])
    role?: string;
}