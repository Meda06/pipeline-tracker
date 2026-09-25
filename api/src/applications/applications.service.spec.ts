import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  // A fake Prisma: each method is a mock we control, so no database is involved.
  const prisma = {
    application: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    service = moduleRef.get(ApplicationsService);
  });

  describe('create', () => {
    it('converts appliedAt to a Date and returns the created row', async () => {
      const created = { id: 'a1', company: 'Acme', role: 'Developer' };
      prisma.application.create.mockResolvedValue(created);

      const result = await service.create({
        company: 'Acme',
        role: 'Developer',
        appliedAt: '2026-09-24',
      });

      expect(prisma.application.create).toHaveBeenCalledWith({
        data: {
          company: 'Acme',
          role: 'Developer',
          appliedAt: new Date('2026-09-24'),
        },
      });
      expect(result).toBe(created);
    });
  });

  describe('findAll', () => {
    it('filters by status when one is given', async () => {
      prisma.application.findMany.mockResolvedValue([]);

      await service.findAll('INTERVIEWING');

      expect(prisma.application.findMany).toHaveBeenCalledWith({
        where: { status: 'INTERVIEWING' },
        orderBy: { appliedAt: 'desc' },
      });
    });

    it('returns everything, newest first, when no status is given', async () => {
      prisma.application.findMany.mockResolvedValue([]);

      await service.findAll();

      expect(prisma.application.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: { appliedAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('returns the application when it exists', async () => {
      const found = { id: 'a1' };
      prisma.application.findUnique.mockResolvedValue(found);

      await expect(service.findOne('a1')).resolves.toBe(found);
    });

    it('throws NotFoundException when it does not exist', async () => {
      prisma.application.findUnique.mockResolvedValue(null);

      await expect(service.findOne('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('returns the updated row', async () => {
      const updated = { id: 'a1', status: 'OFFER' };
      prisma.application.update.mockResolvedValue(updated);

      await expect(service.update('a1', { status: 'OFFER' })).resolves.toBe(
        updated,
      );
    });

    it('throws NotFoundException when Prisma reports a missing record', async () => {
      prisma.application.update.mockRejectedValue({ code: 'P2025' });

      await expect(
        service.update('missing', { notes: 'x' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rethrows unexpected errors instead of hiding them', async () => {
      const unexpected = new Error('connection lost');
      prisma.application.update.mockRejectedValue(unexpected);

      await expect(service.update('a1', { notes: 'x' })).rejects.toBe(
        unexpected,
      );
    });
  });

  describe('remove', () => {
    it('deletes the row', async () => {
      prisma.application.delete.mockResolvedValue({ id: 'a1' });

      await expect(service.remove('a1')).resolves.toBeUndefined();
      expect(prisma.application.delete).toHaveBeenCalledWith({
        where: { id: 'a1' },
      });
    });

    it('throws NotFoundException when the row is already gone', async () => {
      prisma.application.delete.mockRejectedValue({ code: 'P2025' });

      await expect(service.remove('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
