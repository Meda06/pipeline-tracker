import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApplicationStatus } from '../../generated/prisma/client';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  role!: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsDateString()
  appliedAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
