import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';

@Controller('operadores')
export class OperadoresController {

    constructor(private operadoresService: OperadoresService) { }

    // GET
    @Get(':id/pedidos')
    getOrders(@Param('id', ParseIntPipe) id: number) {
        return this.operadoresService.getOrderByUser(id);
    }

    // POST
    @Post()
    create(@Body() payload: CreateOperadorDTO) {
        return {
            message: 'Acción de crear',
            payload,
        };
    }

    // PUT
    @Put(':id/pedidos')
    updateOperador(
        @Param('id') id: string,
        @Body() body: UpdateOperadorDTO,
    ) {
        return {
            id: id,
            email: body.email,
            password: body.password,
            role: body.role,
        };
    }

    // DELETE
    @Delete(':id')
    deleteOperador(@Param('id') id: string): any {
        return {
            id: id,
            delete: true,
            count: 1,
        };
    }
}
