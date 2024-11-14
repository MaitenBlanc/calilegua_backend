import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PedidosService } from '../services/pedidos.service';
import { CreatePedidoDTO, UpdatePedidoDTO } from '../dtos/pedidos.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
    constructor(private pedidosService: PedidosService) { }

    // GET
    @Get()
    findAll() {
        return this.pedidosService.findAll();
    }

    @Get(':id')
    getPedido(@Param('id', ParseIntPipe) id: number) {
        return this.pedidosService.findOne(id);
    }

    // POST
    @Post()
    create(@Body() payload: CreatePedidoDTO) {
        return this.pedidosService.create(payload);
    }

    // PUT
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdatePedidoDTO
    ) {
        return this.pedidosService.update(id, payload);
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.pedidosService.remove(+id);
    }
}
