import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO, RemoveProductDTO, UpdateProductDTO } from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {

    constructor(private productsService: ProductosService) { }

    // GET
    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({ summary: 'Producto: ' })
    getProducto(
        @Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(+id);
    }

    @Get('')
    @ApiOperation({ summary: 'Catálogo con todos los productos' })
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
    @Put(':id')
    updateProducto(@Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateProductDTO) {
        return this.productsService.update(+id, payload);
    }

    @Put(':id/category/:categoryId')
    addCategoryToProduct(
        @Param('id') id: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        return this.productsService.addCategoryToProduct(id, categoryId);
    }

    // DELETE
    @Delete(':id')
    deleteProducto(@Param('id') id: number,
        @Body() body: RemoveProductDTO) {
        return {
            id: id,
            delete: true,
            count: 1,
        };
    }

}
