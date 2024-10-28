import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompradoresController } from './controllers/compradores.controller';
import { CompradoresService } from './services/compradores.service';
import { Comprador } from './entities/comprador.entity';

import { OperadoresController } from './controllers/operadores.controller';
import { OperadoresService } from './services/operadores.service';

import { PedidosController } from './controllers/pedidos.controller';
import { PedidosService } from './services/pedidos.service';

import { DetallepedidoController } from './controllers/detallepedido.controller';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comprador]), ProductosModule],
    controllers: [CompradoresController, OperadoresController, PedidosController, DetallepedidoController],
    providers: [CompradoresService, OperadoresService, PedidosService],
})
export class OperadoresModule { }
