import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresService } from './operadores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Operador } from '../entities/operador.entity';
import { ProductosService } from 'src/productos/services/productos.service';
import { CompradoresService } from './compradores.service';

const mockProductosService = {
  getProducto: jest.fn().mockResolvedValue({ id: 1, name: 'Producto 1' }),
};

const mockCompradoresService = {
  getCompradores: jest.fn().mockResolvedValue([{ id: 1, name: 'Comprador 1' }]),
};

describe('OperadoresService', () => {
  let service: OperadoresService;

  // Mock del modelo de Operadores
  const mockOperadoresModel = {
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'Operador 1' }]),
    findById: jest.fn().mockResolvedValue({ id: 1, name: 'Operador 1' }),
    create: jest.fn().mockResolvedValue({ id: 1, name: 'Operador 1' }),
    updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperadoresService,
        {
          provide: ProductosService,
          useValue: mockProductosService,
        },
        {
          provide: CompradoresService,
          useValue: mockCompradoresService,
        },
        {
          provide: getModelToken(Operador.name),
          useValue: mockOperadoresModel,
        },
      ],
    }).compile();

    service = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
