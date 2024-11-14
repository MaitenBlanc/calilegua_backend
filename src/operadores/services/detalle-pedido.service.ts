import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from 'src/operadores/entities/detallePedido.entity';
import { Pedido } from 'src/operadores/entities/pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { CreateDetallePedidoDTO } from '../dtos/detallePedido.dto';

@Injectable()
export class DetallePedidoService {

    constructor(
        @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
        @InjectRepository(DetallePedido) private detalleRepo: Repository<DetallePedido>,
        @InjectRepository(Producto) private productoRepo: Repository<Producto>,
    ) { }

    async create(payload: CreateDetallePedidoDTO) {
        const pedido = await this.pedidoRepo.findOneBy({ id: payload.pedidoId });
        const producto = await this.productoRepo.findOneBy({ id: payload.productoId });

        if (!pedido) {
            throw new Error(`Pedido con id ${payload.pedidoId} no encontrado.`);
        }

        if (!producto) {
            throw new Error(`Producto con id ${payload.productoId} no encontrado.`);
        }

        const detalle = new DetallePedido();

        detalle.pedido = pedido;
        detalle.producto = producto;
        detalle.cantidad = payload.cantidad;

        return this.detalleRepo.save(detalle);
    }
}
