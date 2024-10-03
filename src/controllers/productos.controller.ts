import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDTO } from 'src/dtos/productos.dto';
import { ProductosService } from 'src/services/productos.service';

@Controller('productos')
export class ProductosController {

    constructor(private productsService: ProductosService) { }

    // GET
    @Get(':idProduct')
    getProducto2(@Param('idProduct') idProduct: string): string {
        return `El identificador del producto es: ${idProduct}`;
    }

    @Get('listar')
    findAll() {
        return this.productsService.findAll();
    }

    // POST
    @Post()
    create(@Body() payload: CreateProductDTO) {
        return {
            message: 'Acción de crear',
            payload,
        };
    }

    // PUT
    @Put(':idProduct')
    updateProducto(@Param('idProduct') idProduct: string, @Body() body: CreateProductDTO): any {
        return {
            idProduct: idProduct,
            nombre: body.nombre,
            precio: body.precio,
        };
    }

    // DELETE
    @Delete(':idProduct')
    deleteProducto(@Param('idProduct') idProduct: string): any {
        return {
            idProduct: idProduct,
            delete: true,
            count: 1,
        };
    }

}
