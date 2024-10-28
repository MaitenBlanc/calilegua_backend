import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fabricante } from '../entities/fabricante.entity';
import { CreateFabricanteDTO, UpdateFabricanteDTO } from '../dtos/fabricante.dto';

@Injectable()
export class FabricantesService {
    constructor(
        @InjectRepository(Fabricante) private fabricanteRepo: Repository<Fabricante>,
    ) { }

    async findAll() {
        return await this.fabricanteRepo.find();
    }

    async findOne(id: number) {
        const fabricante = await this.fabricanteRepo.findOneBy({ id });

        if (!fabricante) {
            throw new NotFoundException(`El fabricante con id: #${id} no existe.`);
        }
        return fabricante;
    }

    create(payload: CreateFabricanteDTO) {
        const newFabricante = this.fabricanteRepo.create(payload);
        return this.fabricanteRepo.save(newFabricante);
    }

    async update(id: number, payload: UpdateFabricanteDTO) {
        const fabricante = await this.fabricanteRepo.findOneBy({ id });
        if (!fabricante) {
            throw new NotFoundException(`El fabricante con id: #${id} no existe.`);
        }
        this.fabricanteRepo.merge(fabricante, payload);
        return this.fabricanteRepo.save(fabricante);
    }

    remove(id: number) {
        return this.fabricanteRepo.delete(id);
    }
}
