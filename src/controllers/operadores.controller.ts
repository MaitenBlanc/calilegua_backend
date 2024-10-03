import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('operadores')
export class OperadoresController {
    // GET
    @Get(':idOperador')
    getOperador(@Param('idOperador') idOperador: string): string {
        return `El identificador del operador es: ${idOperador}`;
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
    @Put(':idOperador')
    updateOperador(
        @Param('idOperador') idOperador: string,
        @Body() body: any,
    ) {
        return {
            idOperador: idOperador,
            nombre: body.nombre,
            origen: body.origen,
        };
    }

    // DELETE
    @Delete(':idOperador')
    deleteOperador(@Param('idOperador') idOperador: string): any {
        return {
            idOperador: idOperador,
            delete: true,
            count: 1,
        };
    }
}
