import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateProductDTO, RemoveProductDTO, UpdateProductDTO } from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';

@Controller('productos')
export class ProductosController {

    constructor(private productsService: ProductosService) { }

    // GET
    @Get(':idProduct')
    @HttpCode(HttpStatus.ACCEPTED)
    getProducto(
        @Param('idProduct', ParseIntPipe) idProduct: string,) {
        return this.productsService.findOne(+idProduct);
    }

    @Get('listar')
    getProducts(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand = '',
    ) {
        return this.productsService.findAll();
    }

    // POST
    @Post()
    create(@Body() payload: CreateProductDTO) {
        return this.productsService.create(payload);
    }

    // PUT
    @Put(':idProduct')
    updateProducto(@Param('idProduct') idProduct: string,
        @Body() payload: UpdateProductDTO) {
        return this.productsService.update(+idProduct, payload);
    }

    // DELETE
    @Delete(':idProduct')
    deleteProducto(@Param('idProduct') idProduct: string,
        @Body() body: RemoveProductDTO) {
        return {
            idProduct: idProduct,
            delete: true,
            count: 1,
        };
    }

}
