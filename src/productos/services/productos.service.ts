import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from 'src/productos/entities/producto.entity';
import { CreateProductDTO, UpdateProductDTO } from 'src/productos/dtos/productos.dto';
import { FabricantesService } from './fabricantes.service';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto) private productRepo: Repository<Producto>,
        private fabricantesService: FabricantesService,
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

    async create(payload: CreateProductDTO) {
        const newProduct = this.productRepo.create(payload);

        if (payload.fabricanteId) {
            const fabricante = await this.fabricantesService.findOne(payload.fabricanteId);
            newProduct.fabricante = fabricante;
        }

        return this.productRepo.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDTO) {
        const product = await this.productRepo.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`El producto con id: #${id} no existe.`);
        }

        if(payload.fabricanteId) {
            const fabricante = await this.fabricantesService.findOne(payload.fabricanteId);
            product.fabricante = fabricante;
        }

        this.productRepo.merge(product, payload);
        return this.productRepo.save(product);
    }

    remove(id: number) {
        return this.productRepo.delete(id);
    }
}
