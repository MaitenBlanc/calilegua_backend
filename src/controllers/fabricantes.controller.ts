import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('fabricantes')
export class FabricantesController {
    // GET
    @Get('/:nombre/productos/:productId')
    getCategory(@Param('productId') productId: string, @Param('nombre') nombre: string) {
        return `El ID del producto es ${productId} del fabricante ${nombre}`;
    }

    @Get('fabricantes')
    getProducts(
        @Query('id') id = 1,
        @Query('nombre') nombre = 'ACME',
        @Query('origen') origen: string,
    ) {
        return `El fabricante con ID ${id}, y nombre => ${nombre} es de procedencia ${origen}`;
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
    @Put(':idFabricante')
    updateFabricante(
        @Param('idFabricante') idFabricante: string,
        @Body() body: any,
    ): any {
        return {
            idFabricante: idFabricante,
            nombre: body.nombre,
            origen: body.origen,
        }
    }

    // DELETE
    @Delete(':idFabricante')
    deleteFabricante(@Param('idFabricante') idFabricante: string): any {
        return {
            idFabricante: idFabricante,
            delete: true,
            count: 1,
        };
    }
}
