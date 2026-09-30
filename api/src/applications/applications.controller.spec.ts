import { Test } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationStatus } from '../generated/prisma/enums';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    update:  jest.fn(),
    remove: jest.fn()
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

  describe('findAll', () =>{ 
    it('passes only the status to the service when one is given',
        async () =>{
            const list = [{id: 'a1', status:"INTERVIEWING"}]
            service.findAll.mockResolvedValue(list)
            const result = await controller.findAll({status:"INTERVIEWING"})
            expect(service.findAll).toHaveBeenCalledWith("INTERVIEWING")
            expect(result).toBe(list)
        }
    )
    it('passes undefined to the service when no status is given',
        async () =>{
            const list = [{id: 'a1', status:"INTERVIEWING"},
              {id: 'a2', status:"APPLIED"}
            ]
            service.findAll.mockResolvedValue(list)
            const result = await controller.findAll({})
            expect(service.findAll).toHaveBeenCalledWith(undefined)
            expect(result).toBe(list)
        }
    )
  })
  describe('update', () =>{
    it('passe the id and dto to the service to update',
      async () => {
        const dto = {
          company: 'Acme',
          role: 'Developer',
        status:ApplicationStatus.OFFER } 

        const updated = {
          id: 'a1',
          appliedAt: '2026-09-24',
          company: 'Acme',
          role: 'Developer',
        status:ApplicationStatus.OFFER } 

        service.update.mockResolvedValue(updated)
        const result = await controller.update('a1', dto)
        expect(service.update).toHaveBeenCalledWith('a1', dto)
        expect(result).toBe(updated)
      }
    )
  })

  describe('remove', () => {
    it('passes the id and return undefined',
    async () => { 
      service.remove.mockResolvedValue(undefined)
      const result = await controller.remove('a1')
      expect(service.remove).toHaveBeenCalledWith('a1')
      expect(result).toBeUndefined()
    }
  )
  })
});
