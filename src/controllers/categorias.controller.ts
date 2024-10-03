import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

@Controller('categorias')
export class CategoriasController {
    // GET
    @Get(':idCategoria')
    getCategoria(@Param('idCategoria') idCategoria: string): string {
        return `El ID de la categoria es: ${idCategoria}`;
    }

    // POST
    create(@Body() payload: any) {
        return {
            message: 'Acción de crear',
            payload,
        };
    }

    // PUT
    @Put(':idCategoria')
    updateCategoria(
        @Param('idCategoria') idCategoria: string,
        @Body() body: any
    ): any {
        return {
            idCategoria: idCategoria,
            nombre: body.nombre,
            imagen: body.imagen
        }
    }

    // DELETE
    @Delete(':idCategoria')
    deleteCategoria(@Param('idCategoria') idCategoria: string): any {
        return {
            idCategoria: idCategoria,
            delete: true,
            count: 1
        };
    }

}