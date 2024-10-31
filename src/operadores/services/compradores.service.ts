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
        const comprador = await this.compradorRepo.findOne({ id });
        if (!comprador) {
            throw new NotFoundException(`El comprador con id: #${id} no existe.`);
        }
        return comprador;
    }

    create(payload: CreateCompradorDTO) {
        const newComprador = this.compradorRepo.create(payload);
        return this.compradorRepo.save(newComprador);
    }

    async update(id: number, payload: UpdateCompradorDTO) {
        const comprador = await this.compradorRepo.findOne({ id });
        if (!comprador) {
            throw new NotFoundException(`El comprador con id: #${id} no existe.`);
        }
        this.compradorRepo.merge(comprador, payload);
        return this.compradorRepo.save(comprador);
    }

    remove(id: number) {
        return this.compradorRepo.delete(id);
    }
}
