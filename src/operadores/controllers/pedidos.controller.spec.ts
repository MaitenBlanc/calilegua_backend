import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from '../services/pedidos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pedido } from '../entities/pedido.entity';

describe('PedidosController', () => {
  let controller: PedidosController;

  // Mock del modelo Pedido
  const mockPedidoModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [
        PedidosService,
        {
          provide: getModelToken(Pedido.name),
          useValue: mockPedidoModel,
        }
      ],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
