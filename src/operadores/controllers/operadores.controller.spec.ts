import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresController } from './operadores.controller';
import { OperadoresService } from '../services/operadores.service';
import { ProductosService } from 'src/productos/services/productos.service';
import { ProductosModule } from 'src/productos/productos.module';
import { CompradoresService } from '../services/compradores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Operador } from '../entities/operador.entity';

describe('OperadoresController', () => {
  let controller: OperadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [ProductosModule],
      controllers: [OperadoresController],
      providers: [
        OperadoresService,
        {
          provide: ProductosService,
          useValue: {}
        },
        {
          provide: CompradoresService,
          useValue: {}
        },
        {
          provide: getModelToken(Operador.name),
          useValue: {}
        },
        { provide: getModelToken('ProductoModel'), useValue: {} },
        { provide: 'DatabaseConnection', useValue: {} },
      ]
    }).compile();

    controller = module.get<OperadoresController>(OperadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
