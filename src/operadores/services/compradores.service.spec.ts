import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresService } from './compradores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comprador } from '../entities/comprador.entity';

describe('CompradoresService', () => {
  let service: CompradoresService;

  // Mock del modelo de Compradores
  const mockCompradoresModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompradoresService,
        {
          provide: getModelToken(Comprador.name),
          useValue: mockCompradoresModel,
        }
      ],
    }).compile();

    service = module.get<CompradoresService>(CompradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
