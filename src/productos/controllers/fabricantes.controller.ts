import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { FabricantesService } from '../services/fabricantes.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateFabricanteDTO, UpdateFabricanteDTO } from '../dtos/fabricantes.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('fabricantes')
export class FabricantesController {
    constructor(private fabricantesService: FabricantesService) { }

    // GET
    @Get('/:nombre/productos/:productId')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiOperation({ summary: 'Producto de un fabricante' })
    getProductByFabricante(@Param('productId') productId: string) {
        return this.fabricantesService.findOne(productId);
    }

    @Get('')
    @ApiOperation({ summary: 'Lista de fabricantes' })
    getFabricantes(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand = '',
    ) {
        return this.fabricantesService.findAll();
    }

    // POST
    @Post()
    create(@Body() payload: CreateFabricanteDTO) {
        return this.fabricantesService.create(payload);
    }

    // PUT
    @Put(':id')
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateFabricanteDTO,
    ) {
        return this.fabricantesService.update(id, payload);
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.fabricantesService.remove(id);
    }
}
