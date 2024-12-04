import { Test, TestingModule } from '@nestjs/testing';
import { FabricantesController } from './fabricantes.controller';
import { FabricantesService } from '../services/fabricantes.service';
import { Fabricante } from '../entities/fabricante.entity';
import { getModelToken } from '@nestjs/mongoose';

// Mock de Fabricante
const mockFabricanteService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe('FabricantesController', () => {
  let controller: FabricantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FabricantesController],
      providers: [FabricantesService,
        {
          provide: getModelToken(Fabricante.name),
          useValue: {}
        },
        {
          provide: FabricantesService,
          useValue: mockFabricanteService,
        }
      ],
    }).compile();

    controller = module.get<FabricantesController>(FabricantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
