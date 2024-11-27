import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { HttpModule } from '@nestjs/axios';
import { MongoClient } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from './productos/entities/producto.entity';

const uri = 'mongodb://mongo:secreta123@localhost:27017/'
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const database = client.db('admin');
  const taskCollection = database.collection('tareas');
  const tasks = await taskCollection.find().toArray();
  console.log(tasks);
}
run();

@Module({
  imports: [HttpModule, DatabaseModule, OperadoresModule, ProductosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductoSchema }]),
    MongooseModule.forRoot(uri)
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri = 'mongodb://mongo:secreta123@localhost:27017/';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('admin');
        return database;
      }
    }
  ],
  exports: ['MONGO'],

})
export class AppModule { }
