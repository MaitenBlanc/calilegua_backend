import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from 'src/productos/entities/producto.entity';
import {
    CreateProductDTO,
    UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto) private productRepo: Repository<Producto>,
    ) { }

    async findAll() {
        return await this.productRepo.find();
    }

    async findOne(id: number) {
        const product = await this.productRepo.findOneBy({ id });

        if (!product) {
            throw new NotFoundException(`El producto con id: #${id} no existe.`);
        }
        return product;
    }

    create(payload: CreateProductDTO) {
        const newProduct = this.productRepo.create(payload);
        return this.productRepo.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDTO) {
        const product = await this.productRepo.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`El producto con id: #${id} no existe.`);
        }
        this.productRepo.merge(product, payload);
        return this.productRepo.save(product);
    }

    remove(id: number) {
        return this.productRepo.delete(id);
    }
}
