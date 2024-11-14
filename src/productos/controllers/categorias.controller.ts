import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categoria.dto';
import { ProductosService } from '../services/productos.service';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
    constructor(
        private categroyService: CategoriasService,
        private productsService: ProductosService,
    ) { }

    // GET
    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({ summary: 'Categoria: ' })
    getCategoria(@Param('id', ParseIntPipe) id: number) {
        return this.categroyService.findOne(+id);
    }

    // POST
    @Post()
    create(@Body() payload: CreateCategoriaDTO) {
        return this.categroyService.create(payload);
    }

    // PUT
    @Put(':id')
    updateCategoria(
        @Param('id') id: number,
        @Body() payload: UpdateCategoriaDTO) {
        return this.categroyService.update(+id, payload);
    }

    // DELETE
    @Delete(':id')
    deleteCategoria(@Param('id') id: number,
        @Body() body: UpdateCategoriaDTO) {
        return {
            id: id,
            delete: true,
            count: 1
        };
    }

}