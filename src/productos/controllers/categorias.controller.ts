import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriasService } from '../services/categorias.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categorias.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('categorias')
export class CategoriasController {
    constructor(private categoriasService: CategoriasService) { }

    // GET
    @Get(':id')
    getCategoria(@Param('id') id: string) {
        return this.categoriasService.findOne(id);
    }

    @Get('')
    @ApiOperation({ summary: 'Registro de categorías' })
    getCompradores() {
        return this.categoriasService.findAll();
    }

    // POST
    @Post()
    create(@Body() payload: CreateCategoriaDTO) {
        return this.categoriasService.create(payload);
    }

    // PUT
    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCategoriaDTO
    ) {
        return this.categoriasService.update(id, payload);
    }

    // DELETE
    @Delete(':id')
    deleteCategoria(@Param('id') id: string) {
        return this.categoriasService.remove(id);
    }
}