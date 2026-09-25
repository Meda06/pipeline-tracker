import { Test } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;
  const service = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [{ provide: ApplicationsService, useValue: service }],
    }).compile();
    controller = moduleRef.get(ApplicationsController);
  });

  describe('create', () => {
    it(' "POST /applications calls service.create with the body,"', async () => {
      const dto = {
        company: 'Acme',
        role: 'Developer',
        appliedAt: '2026-09-24',
      };

      const created = {
        id: 'a1',
        company: 'Acme',
        role: 'Developer',
        appliedAt: '2026-09-24',
        status:'APPLIED'
      };

      service.create.mockResolvedValue(created);
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto)
      expect(result).toBe(created)
    });
  });
});
