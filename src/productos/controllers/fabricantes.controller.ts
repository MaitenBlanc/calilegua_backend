import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FabricantesService } from '../services/fabricantes.service';
import { CreateFabricanteDTO, RemoveFabricanteDTO, UpdateFabricanteDTO } from '../dtos/fabricante.dto';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {

    constructor(private fabricanteService: FabricantesService) { }

    // GET
    @Get('/:nombre/productos/:productId')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({ summary: 'Producto de un fabricante' })
    getProductByFabricante(@Param('productId') productId: number) {
        return this.fabricanteService.findOne(productId);
    }

    @Get('')
    @ApiOperation({ summary: 'Fabricantes' })
    getFabricantes(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand = '',
    ) {
        return this.fabricanteService.findAll();
    }

    // POST
    @Post()
    create(@Body() payload: CreateFabricanteDTO) {
        return this.fabricanteService.create(payload);
    }

    // PUT
    @Put(':idFabricante')
    updateFabricante(
        @Param('idFabricante', ParseIntPipe) idFabricante: number,
        @Body() payload: UpdateFabricanteDTO) {
        return this.fabricanteService.update(idFabricante, payload)
    }

    // DELETE
    @Delete(':idFabricante')
    deleteFabricante(
        @Param('idFabricante') idFabricante: number,
        @Body() payload: RemoveFabricanteDTO) {
        return {
            idFabricante: idFabricante,
            delete: true,
            count: 1,
        };
    }
}
