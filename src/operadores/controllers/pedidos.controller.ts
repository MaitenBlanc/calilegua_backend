import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PedidosService } from '../services/pedidos.service';
import { ApiOperation } from '@nestjs/swagger';
import { AddProductsToOrderDTO, CreatePedidoDTO } from '../dtos/pedidos.dto';

@Controller('pedidos')
export class PedidosController {
    constructor(private pedidosService: PedidosService) { }

    // GET
    @Get('')
    @ApiOperation({ summary: 'Registro de pedidos' })
    getPedido() {
        return this.pedidosService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un pedido por ID' })
    getPedidoById(@Param('id') id: string) {
        return this.pedidosService.findOne(id);
    }

    // POST
    @Post('')
    @ApiOperation({ summary: 'Crear un nuevo pedido' })
    create(@Body() payload: CreatePedidoDTO) {
        return this.pedidosService.create(payload);
    }

    // PUT
    @Put(':id/productos')
    addProducts(
        @Param('id') id: string,
        @Body() payload: AddProductsToOrderDTO
    ) {
        return this.pedidosService.addProductos(id, payload.productsIds);
    }

    // DELETE
    @Delete(':id/producto/:productId')
    removeProduct(
        @Param('id') id: string,
        @Param('productId') productId: string,
    ) {
        return this.pedidosService.removeProducto(id, productId);
    }
}
