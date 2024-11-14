import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosModule } from 'src/productos/productos.module';

import { CompradoresController } from './controllers/compradores.controller';
import { CompradoresService } from './services/compradores.service';
import { Comprador } from './entities/comprador.entity';

import { OperadoresController } from './controllers/operadores.controller';
import { OperadoresService } from './services/operadores.service';
import { Operador } from './entities/operador.entity';

import { PedidosController } from './controllers/pedidos.controller';
import { PedidosService } from './services/pedidos.service';
import { Pedido } from './entities/pedido.entity';

import { DetallepedidoController } from './controllers/detallepedido.controller';
import { DetallePedidoService } from './services/detalle-pedido.service';
import { DetallePedido } from './entities/detallePedido.entity';

@Module({
    imports: [ProductosModule, TypeOrmModule.forFeature([Operador, Comprador, Pedido, DetallePedido])],
    controllers: [OperadoresController, CompradoresController, PedidosController, DetallepedidoController],
    providers: [OperadoresService, CompradoresService, PedidosService, DetallePedidoService],
})
export class OperadoresModule { }
