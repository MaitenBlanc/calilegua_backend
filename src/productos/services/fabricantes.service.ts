import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Fabricante } from '../entities/fabricante.entity';
import { Model } from 'mongoose';
import { CreateFabricanteDTO, UpdateFabricanteDTO } from '../dtos/fabricantes.dto';

@Injectable()
export class FabricantesService {
    constructor(
        @InjectModel(Fabricante.name) private fabricanteModel: Model<Fabricante>
    ) { }

    async findAll() {
        return this.fabricanteModel.find().exec();
    }

    async findOne(id: string) {
        const fabricante = await this.fabricanteModel.findById(id).exec();

        if (!fabricante) {
            throw new NotFoundException(`El fabricante con id #${id} no existe.`);
        }
        return fabricante;
    }

    create(payload: CreateFabricanteDTO) {
        const newFabricante = new this.fabricanteModel(payload);
        return newFabricante.save();
    }

    update(id: string, payload: UpdateFabricanteDTO) {
        const fabricante = this.fabricanteModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()

        if (!fabricante) {
            throw new NotFoundException(`El fabricante con id #${id} no se encuentra.`);
        }
        return fabricante;
    }

    remove(id: string) {
        return this.fabricanteModel.findByIdAndDelete(id);
    }
}
