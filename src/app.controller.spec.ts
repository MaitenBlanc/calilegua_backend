import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getModelToken } from '@nestjs/mongoose'; // Si usas Mongoose para MongoDB
import { registerAs } from '@nestjs/config';
import config from './config';

describe('AppController', () => {
  let appController: AppController;

  // Mock de los proveedores
  const mockAppService = {
    getTasks: jest.fn(() => ['Task 1', 'Task 2']),
  };

  const mockConfig = {
    apiKey: 'test-api-key',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: getModelToken('MONGO'), useValue: {} },
        { provide: 'CONFIGURATION(config)', useValue: mockConfig },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return "Tasks"', () => {
    expect(appController.getTasks()).toEqual(['Task 1', 'Task 2']);
  });
});
