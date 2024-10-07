import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { CompradoresService } from './services/compradores.service';
import { FabricantesService } from './services/fabricantes.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  imports: [],
  controllers: [AppController, FabricantesController, ProductosController, CategoriasController, 
                CompradoresController, OperadoresController, PedidosController],
  providers: [AppService, ProductosService, CategoriasService, CompradoresService, FabricantesService, OperadoresService, PedidosService],
})
export class AppModule { }
