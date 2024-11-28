import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from '../entities/categoria.entity';
import { Model } from 'mongoose';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categorias.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel(Categoria.name) private categoriaModel: Model<Categoria>
    ) { }

    async findAll() {
        return this.categoriaModel.find().exec();
    }

    async findOne(id: string) {
        const comprador = await this.categoriaModel.findById(id).exec();

        if (!comprador) {
            throw new NotFoundException(`La categoría con id #${id} no existe.`);
        }
        return comprador;
    }

    create(payload: CreateCategoriaDTO) {
        const newCategoria = new this.categoriaModel(payload);
        return newCategoria.save()
    }

    update(id: string, payload: UpdateCategoriaDTO) {
        const categoria = this.categoriaModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()

        if (!categoria) {
            throw new NotFoundException(`La categoría con id #${id} no se encuentra.`);
        }

        return categoria;
    }

    remove(id: string) {
        return this.categoriaModel.findByIdAndDelete(id);
    }
}
