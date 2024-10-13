import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Module({
  imports: [HttpModule, DatabaseModule, OperadoresModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'TAREA_ASINC',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    }
  ],

})
export class AppModule { }
