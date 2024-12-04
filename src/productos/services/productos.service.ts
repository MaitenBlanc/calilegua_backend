import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Producto } from 'src/productos/entities/producto.entity';
import { CreateProductDTO, FilterProductsDTO, UpdateProductDTO } from '../dtos/productos.dto';

@Injectable()
export class ProductosService {
    constructor(
        @InjectModel(Producto.name) private productModel: Model<Producto>
    ) { }

    async findAll(params?: FilterProductsDTO) {
        const filters: FilterQuery<Producto> = {};
        if (params) {
            const { limit, offset, precioMinimo, precioMaximo } = params;

            if (precioMinimo && precioMaximo) {
                filters.precio = { $gte: precioMinimo, $lte: precioMaximo }
            }
            return this.productModel
                .find(filters)
                .populate('fabricante', 'nombre direccion email')
                .populate('categoria', 'nombre imagen')
                .skip(offset)
                .limit(limit)
                .exec();
        }
        return this.productModel
            .find()
            .populate('fabricante', 'nombre direccion email')
            .populate('categoria', 'nombre imagen')
            .exec();
    }

    async findOne(id: string) {
        const product = await this.productModel
            .findById(id)
            .populate('fabricante', 'nombre direccion email')
            .populate('categoria', 'nombre imagen')
            .exec();

        if (!product) {
            throw new NotFoundException(`El producto con id #${id} no existe`);
        }
        return product;
    }

    async getOrderByUser(id: string) {
        const user = this.findOne(id);

        return {
            date: new Date(),
            user,
            products: await this.findAll(),
        }
    }

    async create(payload: CreateProductDTO) {
        const newProduct = new this.productModel(payload);
        const savedProduct = await newProduct.save();

        return this.productModel
            .findById(savedProduct._id)
            .populate('fabricante', 'nombre direccion email')   // Trae solo los datos que le pido (nombre, direccion, email)
            .populate('categoria', 'nombre imagen')
            .exec();
    }

    update(id: string, payload: UpdateProductDTO) {
        const product = this.productModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec();

        if (!product) {
            throw new NotFoundException(`El producto #${id} no se encuentra.`);
        }

        return product;
    }

    remove(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
}