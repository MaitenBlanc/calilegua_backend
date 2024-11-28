import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDTO } from '../dtos/pedidos.dto';

@Injectable()
export class PedidosService {
    constructor(
        @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>
    ) { }

    async findAll() {
        return this.pedidoModel
            .find()
            .populate('comprador')
            .populate({
                path: 'productos',
                model: 'Producto',
            })
            .exec();
    }

    async findOne(id: string) {
        return this.pedidoModel
            .findById(id)
            .populate('comprador')
            .populate('productos')
            .exec();
    }

    async removeProducto(id: string, productId: string) {
        const pedido = await this.pedidoModel.findById(id);
        pedido.productos.pull(productId);
        return pedido.save();
    }

    async addProductos(id: string, productsIds: string[]) {
        const pedido = await this.pedidoModel.findById(id);
        productsIds.forEach((pId) => pedido.productos.push(pId));
        return pedido.save();
    }

    async create(payload: CreatePedidoDTO) {
        const newPedido = new this.pedidoModel(payload);
        return newPedido.save();
    }
}
