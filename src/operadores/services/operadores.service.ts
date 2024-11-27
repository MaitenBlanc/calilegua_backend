import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class OperadoresService {
    constructor(
        private productsService: ProductosService,
    ) { }

    findOne(id: number): Operador {
        throw new Error('Method not implemented.');
    }

    getOrderByUser(id: number): Pedido {
        const operador = this.findOne(id);

        if (!operador) {
            throw new NotFoundException(`Operador con id ${id} no encontrado`);
        }

        return {
            date: new Date(),
            operador,
            // products: this.productsService.findAll(),
        }
    }
}
