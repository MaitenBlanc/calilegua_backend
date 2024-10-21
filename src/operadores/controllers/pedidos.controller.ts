import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
    // GET
    @Get('/:nombreComprador/:idPedido')
    getPedido(@Param('idPedido') idPedido: string, @Param('nombreComprador') nombreComprador: string) {
        return `El ID del pedido es ${idPedido} del comprador ${nombreComprador}`;
    }

    // POST
    @Post()
    create(@Body() payload: any) {
        return {
            message: 'Acción de crear',
            payload,
        };
    }

    // PUT
    @Put(':idPedido')
    updatePedido(
        @Param('idPedido') idPedido: string,
        @Body() body: any,
    ): any {
        return {
            idPedido: idPedido,
            comprador: body.idComprador,
            monto: body.monto,
        };
    }

    // DELETE
    @Delete(':idPedido')
    deletePedido(@Param('idPedido') idPedido: string): any {
        return {
            idPedido: idPedido,
            delete: true,
            count: 1,
        };
    }
}
