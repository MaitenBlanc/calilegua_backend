import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

import { Producto } from 'src/productos/entities/producto.entity';
import {
    CreateProductDTO,
    FilterProductDTO,
    UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { Fabricante } from '../entities/fabricante.entity';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto) private productRepo: Repository<Producto>,
        @InjectRepository(Fabricante) private fabricanteRepo: Repository<Fabricante>,
        @InjectRepository(Categoria) private categoriaRepo: Repository<Categoria>,
    ) { }

    async findAll(params?: FilterProductDTO) {
        if (params) {
            const where: FindOptionsWhere<Producto> = {};
            const { limit, offset } = params;
            const { precioMinimo, precioMaximo } = params;

            if (precioMinimo && precioMaximo) {
                where.precio = Between(precioMinimo, precioMaximo);
            }

            return this.productRepo.find({
                relations: ['fabricante'],
                where,
                take: limit,
                skip: offset,
            });
        }
        return await this.productRepo.find({
            relations: ['fabricante'],
        });
    }

    async findOne(id: number) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['fabricante', 'categorias'],
        });

        if (!product) {
            throw new NotFoundException(`El producto con id: #${id} no existe.`);
        }
        return product;
    }

    async create(payload: CreateProductDTO) {
        const newProduct = this.productRepo.create(payload);

        if (payload.fabricanteId) {
            const fabricante = await this.fabricanteRepo.findOneBy({ id: payload.fabricanteId });

            if (!fabricante) {
                throw new NotFoundException(`El fabricante con id: #${payload.fabricanteId} no existe.`);
            }

            newProduct.fabricante = fabricante;
        }

        if (payload.categoriasIds && payload.categoriasIds.length > 0) {
            const categorias = await this.categoriaRepo.findBy({ id: In(payload.categoriasIds) });
            newProduct.categorias = categorias;
        }

        return this.productRepo.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDTO) {
        const product = await this.productRepo.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`El producto con id: #${id} no existe.`);
        }

        if (payload.fabricanteId) {
            const fabricante = await this.fabricanteRepo.findOneBy({ id: payload.fabricanteId });
            product.fabricante = fabricante;
        }

        this.productRepo.merge(product, payload);
        return this.productRepo.save(product);
    }

    remove(id: number) {
        return this.productRepo.delete(id);
    }

    async removeCategoryByProduct(productoId: number, categoryId: number) {
        const producto = await this.productRepo.findOne({
            where: { id: productoId },
            relations: ['categorias'],
        })

        producto.categorias = producto.categorias.filter(
            (item) => item.id !== categoryId,
        );

        return this.productRepo.save(producto);
    }


    async addCategoryToProduct(productoId: number, categoryId: number) {
        const producto = await this.productRepo.findOne({
            where: { id: productoId },
            relations: ['categorias'],
        })

        const category = await this.categoriaRepo.findOneBy({ id: categoryId });

        producto.categorias.push(category);
        return this.productRepo.save(producto);
    }
}
