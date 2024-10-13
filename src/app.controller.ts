import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getKey(): string {
    return 'La llave de la aplicación es: ' + this.appService.getKey();
  }

  @Get('usefactory')
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }
}
