import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { ConfigService } from '@nestjs/config';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operadores.dto';

@Injectable()
export class OperadoresService {
    private idCont = 1;

    private readonly operadores: Operador[] = [
        {
            "id": 1,
            "email": "operador1@gmail.com",
            "password": "123456",
            "role": "admin"
        },
        {
            "id": 2,
            "email": "operador2@gmail.com",
            "password": "34564",
            "role": "vendedor"
        }
    ];

    constructor(
        private productsService: ProductosService,
        private configService: ConfigService,
    ) { }

    findOne(id: number): Operador {
        return this.operadores.find(operador => operador.id === id);
    }

    getOrderByUser(id: number): Pedido {
        const operador = this.findOne(id);

        if (!operador) {
            throw new NotFoundException(`Operador con id ${id} no encontrado`);
        }

        return {
            date: new Date(),
            operador,
            products: this.productsService.findAll(),
        }
    }

    findAll(): Operador[] {
        const apikey = this.configService.get('APIKEY');
        const dbname = this.configService.get('DB_NAME');
        console.log(apikey, dbname);
        return this.operadores;
    }

    create(payload: CreateOperadorDTO) {
        const newOperador = {
            id: this.operadores.length + 1,
            ...payload,
        };
        this.operadores.push(newOperador);
        return newOperador;
    }

    update(id: number, payload: UpdateOperadorDTO): Operador {
        const operador = this.findOne(id);

        if (!operador) {
            throw new NotFoundException(`Operador con id ${id} no encontrado`);
        }
        const updateOperador = {
            ...operador,
            ...payload,
        }
        const operadorIndex = this.operadores.findIndex(operador => operador.id === id);
        this.operadores[operadorIndex] = updateOperador;
        return updateOperador;
    }

    delete(id: number): void {
        const operadorIndex = this.operadores.findIndex(operador => operador.id === id);
        if (operadorIndex === -1) {
            throw new NotFoundException(`Operador con id ${id} no encontrado`);
        }
        this.operadores.splice(operadorIndex, 1);
    }
}
