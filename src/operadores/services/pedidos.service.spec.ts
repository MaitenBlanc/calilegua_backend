import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pedido } from '../entities/pedido.entity';

describe('PedidosService', () => {
  let service: PedidosService;

  // Mock del modelo de Pedidos
  const mockPedidosModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosService,
        {
          provide: getModelToken(Pedido.name),
          useValue: mockPedidosModel,
        }
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
