import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'ali@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Ali Khan' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'SecurePass123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '42301-1234567-8', required: false })
  @IsOptional()
  @IsString()
  cnic?: string;

  @ApiProperty({ example: '+92-300-1234567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
