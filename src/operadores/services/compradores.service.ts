import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comprador } from '../entities/comprador.entity';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';

@Injectable()
export class CompradoresService {

    constructor(
        @InjectRepository(Comprador) private compradorRepo: Repository<Comprador>,
    ) { }

    async findAll() {
        return await this.compradorRepo.find();
    }

    async findOne(id: number) {
        const comprador = await this.compradorRepo.findOneBy({ id });

        if (!comprador) {
            throw new NotFoundException(`El comprador con id: #${id} no existe.`);
        }
        return comprador;
    }

    async create(payload: CreateCompradorDTO) {
        const newComprador = await this.compradorRepo.create(payload);
        return this.compradorRepo.save(newComprador);
    }

    async update(id: number, payload: UpdateCompradorDTO) {
        const comprador = await this.findOne(id);
        this.compradorRepo.merge(comprador, payload);
        return this.compradorRepo.save(comprador);
    }

    async remove(id: number) {
        const idDelete = await this.compradorRepo.delete(id);

        if (idDelete.affected === 0) {
            throw new NotFoundException(`El comprador con id: #${id} no existe.`);
        }
    }
}
