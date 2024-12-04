import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, registerAs } from '@nestjs/config';
import config from 'src/config';

// Mock de la configuración
const mockConfigService = {
  get: jest.fn().mockReturnValue('test-api-key'),
};

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({load: [config]})],
      providers: [
        ApiKeyGuard,
        { provide: Reflector, useValue: {} },
        { provide: 'CONFIGURATION(config)', useValue: mockConfigService },
      ],
    }).compile();

    apiKeyGuard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('should be defined', () => {
    expect(apiKeyGuard).toBeDefined();
  });
});