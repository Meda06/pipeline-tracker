import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationStatus } from '../generated/prisma/client';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

// Prisma's error code for "record to update/delete does not exist".
const RECORD_NOT_FOUND = 'P2025';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateApplicationDto) {
    return this.prisma.application.create({ data: this.toData(dto) });
  }

  findAll(status?: ApplicationStatus) {
    return this.prisma.application.findMany({
      where: status ? { status } : undefined,
      orderBy: { appliedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException(`Application ${id} not found`);
    }
    return application;
  }

  async update(id: string, dto: UpdateApplicationDto) {
    try {
      return await this.prisma.application.update({
        where: { id },
        data: this.toData(dto),
      });
    } catch (error) {
      throw this.mapError(error, id);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.application.delete({ where: { id } });
    } catch (error) {
      throw this.mapError(error, id);
    }
  }

  // The API accepts dates as strings; the database layer wants a Date object.
  private toData<T extends { appliedAt?: string }>(
    dto: T,
  ): Omit<T, 'appliedAt'> & { appliedAt?: Date } {
    const { appliedAt, ...rest } = dto;
    return {
      ...rest,
      ...(appliedAt ? { appliedAt: new Date(appliedAt) } : {}),
    };
  }

  private mapError(error: unknown, id: string) {
    if ((error as { code?: string }).code === RECORD_NOT_FOUND) {
      return new NotFoundException(`Application ${id} not found`);
    }
    return error;
  }
}
