import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { Comprador } from '../entities/comprador.entity';
import { CreatePedidoDTO, UpdatePedidoDTO } from '../dtos/pedidos.dto';

@Injectable()
export class PedidosService {
    constructor(
        @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
        @InjectRepository(Comprador) private compradorRepo: Repository<Comprador>,
    ) { }

    findAll() {
        return this.pedidoRepo.find({
            relations: ['detalles', 'detalles.producto']
        });
    }

    async findOne(id: number) {
        const pedido = await this.pedidoRepo.findOne({
            where: { id },
            relations: ['detalles', 'detalles.producto']
        });

        if (!pedido) {
            throw new NotFoundException(`El pedido con id ${id} no existe.`);
        }

        return pedido;
    }

    async create(payload: CreatePedidoDTO) {
        const pedido = new Pedido();

        if (payload.compradorId) {
            const customer = await this.compradorRepo.findOneBy({ id: payload.compradorId });
            pedido.comprador = customer;
        }

        return this.pedidoRepo.save(pedido);
    }

    async update(id: number, payload: UpdatePedidoDTO) {
        const pedido = await this.pedidoRepo.findOneBy({ id })

        if (payload.compradorId) {
            const customer = await this.compradorRepo.findOneBy({ id: payload.compradorId });
            pedido.comprador = customer;
        }

        return this.pedidoRepo.save(pedido);
    }

    remove(id: number) {
        return this.pedidoRepo.delete(id);
    }
}
