import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompradoresService } from '../services/compradores.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/compradores.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('compradores')
export class CompradoresController {
    constructor(private compradoresService: CompradoresService) { }

    // GET
    @Get(':id')
    getComprador(@Param('id') id: string) {
        return this.compradoresService.findOne(id);
    }

    @Get('')
    @ApiOperation({ summary: 'Registro de compradores' })
    getCompradores() {
        return this.compradoresService.findAll();
    }

    // POST
    @Post()
    create(@Body() payload: CreateCompradorDTO) {
        return this.compradoresService.create(payload);
    }

    // PUT
    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCompradorDTO,
    ) {
        return this.compradoresService.update(id, payload);
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.compradoresService.remove(id);
    }
}