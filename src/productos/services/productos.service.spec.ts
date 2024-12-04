import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Producto } from '../entities/producto.entity'; 

describe('ProductosService', () => {
  let service: ProductosService;

  // Mock del modelo de Producto
  const mockProductoModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosService,
        {
          provide: getModelToken(Producto.name),
          useValue: mockProductoModel,
        }
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
