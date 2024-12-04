import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { OperadoresService } from 'src/operadores/services/operadores.service';
import { ProductosService } from 'src/productos/services/productos.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockProductosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService,
        {
          provide: ProductosService,
          useValue: mockProductosService,
        },
        {
          provide: OperadoresService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
