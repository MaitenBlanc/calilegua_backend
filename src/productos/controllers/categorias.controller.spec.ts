import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from '../services/categorias.service';
import { getModelToken } from '@nestjs/mongoose';
import { Categoria } from '../entities/categoria.entity';

describe('CategoriasController', () => {
  let controller: CategoriasController;

  // Mock del modelo Categoria
  const mockCategoriaModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers: [
        CategoriasService,
        {
          provide: getModelToken(Categoria.name),
          useValue: mockCategoriaModel,
        }
      ],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
