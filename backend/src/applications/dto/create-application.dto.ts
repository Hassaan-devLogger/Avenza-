import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationType } from '../application.entity';

export class CreateApplicationDto {
  @ApiProperty({ enum: ApplicationType })
  @IsEnum(ApplicationType)
  type: ApplicationType;

  @ApiProperty({ example: 'Birth Certificate Request' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Requesting birth certificate for child registration', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Birth Certificate', required: false })
  @IsOptional()
  @IsString()
  documentType?: string;
}
