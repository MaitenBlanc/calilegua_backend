import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comprador } from '../entities/comprador.entity';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/compradores.dto';

@Injectable()
export class CompradoresService {
    constructor(
        @InjectModel(Comprador.name) private compradorModel: Model<Comprador>
    ) { }

    async findAll() {
        return this.compradorModel.find().exec();
    }

    async findOne(id: string) {
        const comprador = await this.compradorModel.findById(id).exec()

        if (!comprador) {
            throw new NotFoundException(`El comprador con id #${id} no existe.`);
        }
        return comprador;
    }

    create(payload: CreateCompradorDTO) {
        const newComprador = new this.compradorModel(payload);
        return newComprador.save()
    }

    update(id: string, payload: UpdateCompradorDTO) {
        const comprador = this.compradorModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()

        if (!comprador) {
            throw new NotFoundException(`El comprador con id #${id} no se encuentra.`);
        }

        return comprador;
    }

    remove(id: string) {
        return this.compradorModel.findByIdAndDelete(id);
    }

}
