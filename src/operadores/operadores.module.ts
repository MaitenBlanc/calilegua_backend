import { Module } from '@nestjs/common';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { DetallepedidoController } from './controllers/detallepedido.controller';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
    imports: [ProductosModule],
    controllers: [CompradoresController, OperadoresController, PedidosController, DetallepedidoController],
    providers: [CompradoresService, OperadoresService, PedidosService],
})
export class OperadoresModule { }
