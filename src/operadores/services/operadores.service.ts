import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ProductosService } from 'src/productos/services/productos.service';
import { CompradoresService } from './compradores.service';

import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';

import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { number } from 'joi';

@Injectable()
export class OperadoresService {

    constructor(
        private productsService: ProductosService,
        private configService: ConfigService,
        private compradoresService: CompradoresService,
        @Inject('PG') private clientPg: Client,
        @InjectRepository(Operador) private operadorRepo: Repository<Operador>,
    ) { }

    getTask() {
        return new Promise((resolve, reject) => {
            this.clientPg.query('SELECT * FROM tareas', (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            });
        });
    }

    async findAll() {
        return await this.operadorRepo.find();
    }

    async findOne(id: number) {
        const operador = await this.operadorRepo.findOneBy({ id });

        if (!operador) {
            throw new NotFoundException(`Operador con id ${id} no encontrado`);
        }
        return operador;
    }

    async getOrderByUser(id: number) {
        return await this.operadorRepo.findOneBy({ id });
    }

    async create(payload: CreateOperadorDTO) {
        const newOperador = this.operadorRepo.create(payload);
        return await this.operadorRepo.save(newOperador);
    }

    async update(id: number, payload: UpdateOperadorDTO) {
        const operador = await this.findOne(id);
        const updateOperador = this.operadorRepo.merge(operador, payload);

        if (payload.compradorId) {
            const newComprador = await this.compradoresService.findOne(payload.compradorId);
            operador.comprador = newComprador;
        }

        return this.operadorRepo.save(updateOperador);
    }

    async delete(id: number) {
        const idDelete = await this.operadorRepo.delete(id);

        if (idDelete.affected === 0) {
            throw new NotFoundException(`El operador con id: #${id} no existe.`);
        }
    }
}
