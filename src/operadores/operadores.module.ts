import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompradoresController } from './controllers/compradores.controller';
import { CompradoresService } from './services/compradores.service';
import { Comprador } from './entities/comprador.entity';

import { OperadoresController } from './controllers/operadores.controller';
import { OperadoresService } from './services/operadores.service';
import { Operador } from './entities/operador.entity';

import { ProductosModule } from 'src/productos/productos.module';

@Module({
    imports: [ProductosModule, TypeOrmModule.forFeature([Operador, Comprador])],
    controllers: [OperadoresController, CompradoresController],
    providers: [OperadoresService, CompradoresService],
})
export class OperadoresModule { }
