import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresController } from './compradores.controller';
import { CompradoresService } from '../services/compradores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comprador } from '../entities/comprador.entity';

describe('CompradoresController', () => {
  let controller: CompradoresController;

  // Mock del modelo Comprador
  const mockCompradorModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompradoresController],
      providers: [CompradoresService,
        {
          provide: getModelToken(Comprador.name),
          useValue: mockCompradorModel,
        }
      ],
    }).compile();

    controller = module.get<CompradoresController>(CompradoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
