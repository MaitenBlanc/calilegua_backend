import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductosService } from 'src/productos/services/productos.service';
import { Producto } from 'src/productos/entities/producto.entity';

import { Operador } from '../entities/operador.entity';
import { CreateOperadorDTO } from '../dtos/operadores.dto';

import { CompradoresService } from './compradores.service';

import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class OperadoresService {
    constructor(
        private productsService: ProductosService,
        private compradoresService: CompradoresService,
        @InjectModel(Operador.name) private operadorModel: Model<Operador>
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

    async create(payload: CreateOperadorDTO) {
        const newModel = new this.operadorModel(payload);
        const hashPassword = await bcrypt.hash(payload.password, 10);

        newModel.password = hashPassword;

        const model = await newModel.save();
        const { password, ...rta } = model.toJSON();

        return rta;
    }

    findByEmail(email: string) {
        return this.operadorModel.findOne({ email }).exec();
    }
}
