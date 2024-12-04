import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { getModelToken } from '@nestjs/mongoose';
import { Categoria } from '../entities/categoria.entity';

describe('CategoriasService', () => {
  let service: CategoriasService;

  // Mock del modelo de Categoria
  const mockCategoriaModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriasService,
        {
          provide: getModelToken(Categoria.name),
          useValue: mockCategoriaModel,
        }
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
