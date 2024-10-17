import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    OperadoresModule,
    ProductosModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        APIKEY: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'TAREA_ASINC',
      useFactory: async (http: HttpService) => {
        try {
          const req = http.get('https://jsonplaceholder.typicode.com/posts');
          const tarea = await lastValueFrom(req);
          return tarea.data;
        } catch (error) {
          console.log(`error tarea asíncrona: ${error}`);
          return [];
        }
      },
      inject: [HttpService],
    }
  ],

})
export class AppModule { }
