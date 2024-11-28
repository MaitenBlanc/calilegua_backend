import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { CompradoresService } from './compradores.service';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class OperadoresService {
    constructor(
        private productsService: ProductosService,
        private compradoresService: CompradoresService,
    ) { }

    findOne(id: string): Operador {
        throw new Error('Method not implemented.');
    }

    async getOrderByUser(id: string): Promise<Pedido> {
        const operador = this.findOne(id);

        if (!operador) {
            throw new NotFoundException(`Operador con id ${id} no encontrado`);
        }

        const productos: Producto[] = await this.productsService.findAll();
        const comprador = await this.compradoresService.findOne(id);
        const pedido = new Pedido();

        pedido.fechaPedido = new Date();
        // pedido.productos = productos.map(producto => ({
        //     producto: producto._id,
        //     cantidad: 1,
        //     precioUnitario: producto.precio,
        // }));

        pedido.comprador = comprador._id;

        await pedido.save();

        return pedido;
    }
}
