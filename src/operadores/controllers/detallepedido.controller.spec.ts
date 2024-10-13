import { Test, TestingModule } from '@nestjs/testing';
import { DetallepedidoController } from './detallepedido.controller';

describe('DetallepedidoController', () => {
  let controller: DetallepedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallepedidoController],
    }).compile();

    controller = module.get<DetallepedidoController>(DetallepedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
