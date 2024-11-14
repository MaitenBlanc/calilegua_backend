import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {

    constructor(private operadoresService: OperadoresService) { }

    //GET Tareas
    @Get('/tareas')
    getTask() {
        return this.operadoresService.getTask();
    }

    // GET
    @Get('')
    getAll() {
        return this.operadoresService.findAll();
    }

    @Get(':id/pedidos')
    getOrders(@Param('id', ParseIntPipe) id: number) {
        return this.operadoresService.getOrderByUser(id);
    }

    // POST
    @Post()
    create(@Body() payload: CreateOperadorDTO) {
        const operador = this.operadoresService.create(payload);
        return {
            message: 'Operador creado con éxito!',
            operador,
        };
    }

    // PUT
    @Put(':id/pedidos')
    updateOperador(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateOperadorDTO,
    ) {
        return this.operadoresService.update(id, body)
    }

    // DELETE
    @Delete(':id')
    deleteOperador(@Param('id', ParseIntPipe) id: number) {
        this.operadoresService.delete(id);
    }
}
