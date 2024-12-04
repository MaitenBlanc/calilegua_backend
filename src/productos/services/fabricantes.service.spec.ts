import { Test, TestingModule } from '@nestjs/testing';
import { FabricantesService } from './fabricantes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Fabricante } from '../entities/fabricante.entity';

describe('FabricantesService', () => {
  let service: FabricantesService;

  // Mock del modelo de Fabricante
  const mockFabricanteModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FabricantesService,
        {
          provide: getModelToken(Fabricante.name),
          useValue: mockFabricanteModel,
        },
      ],
    }).compile();

    service = module.get<FabricantesService>(FabricantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
