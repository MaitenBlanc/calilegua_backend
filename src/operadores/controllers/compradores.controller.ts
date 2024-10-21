import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
    // GET
    @Get(':idComprador')
    getComprador(@Param('idComprador') idComprador: string): string {
        return `El identificador del comprador es: ${idComprador}`;
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
    @Put(':idComprador')
    updateComprador(
        @Param('idComprador') idComprador: string,
        @Body() body: any,
    ) {
        return {
            idComprador: idComprador,
            nombre: body.nombre,
            email: body.email,
        };
    }

    // DELETE
    @Delete(':idComprador')
    deleteComprador(@Param('idComprador') idComprador: string): any {
        return {
            idComprador: idComprador,
            delete: true,
            count: 1,
        };
    }
}
