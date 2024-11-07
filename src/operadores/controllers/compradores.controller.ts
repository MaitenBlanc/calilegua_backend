import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';
import { Comprador } from '../entities/comprador.entity';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {

    constructor(private compradoresService: CompradoresService) { }

    // GET
    @Get(':idComprador')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({ summary: 'Comprador: ' })
    getComprador(@Param('idComprador', ParseIntPipe) idComprador: number) {
        return this.compradoresService.findOne(idComprador);
    }

    @Get('')
    @ApiOperation({ summary: 'Todos los compradores' })
    getAll(): Promise<Comprador[]> {
        return this.compradoresService.findAll();
    }

    // POST
    @Post()
    async create(@Body() payload: CreateCompradorDTO) {
        return await this.compradoresService.create(payload)
    }

    // PUT
    @Put(':idComprador')
    updateComprador(
        @Param('idComprador', ParseIntPipe) idComprador: number,
        @Body() payload: UpdateCompradorDTO,
    ) {
        return this.compradoresService.update(idComprador, payload);
    }

    // DELETE
    @Delete(':idComprador')
    deleteComprador(@Param('idComprador', ParseIntPipe) idComprador: number) {
        return this.compradoresService.remove(idComprador);
    }
}
