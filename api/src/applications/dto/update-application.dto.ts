import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';

// Every field from the create DTO becomes optional, keeping the same validation rules.
export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
