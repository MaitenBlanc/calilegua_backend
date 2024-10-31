import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
    constructor(private categroyService: CategoriasService) { }

    // GET
    @Get(':idCategoria')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({ summary: 'Categoria: ' })
    getCategoria(@Param('idCategoria', ParseIntPipe) idCategoria: number) {
        return this.categroyService.findOne(+idCategoria);
    }

    // POST
    @Post()
    create(@Body() payload: CreateCategoriaDTO) {
        return this.categroyService.create(payload);
    }

    // PUT
    @Put(':idCategoria')
    updateCategoria(
        @Param('idCategoria') idCategoria: number,
        @Body() payload: UpdateCategoriaDTO) {
        return this.categroyService.update(+idCategoria, payload);
    }

    // DELETE
    @Delete(':idCategoria')
    deleteCategoria(@Param('idCategoria') idCategoria: number,
        @Body() body: UpdateCategoriaDTO) {
        return {
            idCategoria: idCategoria,
            delete: true,
            count: 1
        };
    }

}