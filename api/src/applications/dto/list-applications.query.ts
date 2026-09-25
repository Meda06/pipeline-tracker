import { IsEnum, IsOptional } from 'class-validator';
import { ApplicationStatus } from '../../generated/prisma/client';

export class ListApplicationsQuery {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
