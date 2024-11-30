import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { CreateProductDTO, FilterProductsDTO, UpdateProductDTO } from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';

import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
    constructor(private productsService: ProductosService) { }

    // GET
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Public()
    @Get('')
    @ApiOperation({ summary: 'Registro de productos' })
    getProducts(@Query() params: FilterProductsDTO) {
        return this.productsService.findAll(params);
    }

    // POST
    @Post()
    create(@Body() payload: CreateProductDTO) {
        return this.productsService.create(payload);
    }

    // PUT
    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateProductDTO
    ) {
        return this.productsService.update(id, payload);
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}