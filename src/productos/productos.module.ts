import { Module } from '@nestjs/common';

import { FabricantesController } from './controllers/fabricantes.controller';
import { FabricantesService } from './services/fabricantes.service';

import { CategoriasController } from './controllers/categorias.controller';
import { CategoriasService } from './services/categorias.service';

import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { Categoria, CategoriaSchema } from './entities/categoria.entity';
import { Fabricante, FabricanteSchema } from './entities/fabricante.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Producto.name,
                schema: ProductoSchema,
            },
            {
                name: Fabricante.name,
                schema: FabricanteSchema,
            },
            {
                name: Categoria.name,
                schema: CategoriaSchema,
            }
        ])
    ],
    controllers: [FabricantesController, ProductosController, CategoriasController],
    providers: [ProductosService, CategoriasService, FabricantesService],
    exports: [ProductosService]
})
export class ProductosModule { }
