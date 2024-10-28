import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { Producto } from './entities/producto.entity';

import { FabricantesController } from './controllers/fabricantes.controller';
import { FabricantesService } from './services/fabricantes.service';
import { Fabricante } from './entities/fabricante.entity';

import { CategoriasController } from './controllers/categorias.controller';
import { CategoriasService } from './services/categorias.service';
import { Categoria } from './entities/categoria.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Producto]), TypeOrmModule.forFeature([Categoria]), TypeOrmModule.forFeature([Fabricante])],
    controllers: [FabricantesController, ProductosController, CategoriasController],
    providers: [ProductosService, CategoriasService, FabricantesService],
    exports: [ProductosService]
})
export class ProductosModule { }
