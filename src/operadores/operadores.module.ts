import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductosModule } from 'src/productos/productos.module';

import { CompradoresController } from './controllers/compradores.controller';
import { CompradoresService } from './services/compradores.service';
import { Comprador, CompradorSchema } from './entities/comprador.entity';

import { PedidosController } from './controllers/pedidos.controller';
import { PedidosService } from './services/pedidos.service';
import { Pedido, PedidoSchema } from './entities/pedido.entity';

import { DetallepedidoController } from './controllers/detallepedido.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { OperadoresService } from './services/operadores.service';


@Module({
    imports: [
        ProductosModule,
        MongooseModule.forFeature([
            {
                name: Comprador.name,
                schema: CompradorSchema,
            },
            {
                name: Pedido.name,
                schema: PedidoSchema,
            }
        ])
    ],
    controllers: [CompradoresController, PedidosController, DetallepedidoController, OperadoresController],
    providers: [CompradoresService, PedidosService, OperadoresService],
})
export class OperadoresModule { }
