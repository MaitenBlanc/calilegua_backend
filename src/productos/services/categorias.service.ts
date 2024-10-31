import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria) private categoryRepo: Repository<Categoria>,
    ) { }

    async findAll() {
        return await this.categoryRepo.find();
    }

    async findOne(id: number) {
        const category = await this.categoryRepo.findOne({ id });

        if (!category) {
            throw new NotFoundException(`La categoría con id: #${id} no existe.`);
        }
        return category;
    }

    create(payload: CreateCategoriaDTO) {
        const newCategory = this.categoryRepo.create(payload);
        return this.categoryRepo.save(newCategory);
    }

    async update(id: number, payload: UpdateCategoriaDTO) {
        const category = await this.categoryRepo.findOne({ id });

        if (!category) {
            throw new NotFoundException(`La categoría con id: #${id} no existe.`);
        }
        this.categoryRepo.merge(category, payload);
        return this.categoryRepo.save(category);
    }

    remove(id: number) {
        return this.categoryRepo.delete(id);
    }
}
