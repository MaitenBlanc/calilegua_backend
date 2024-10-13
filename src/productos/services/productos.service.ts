import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from 'src/productos/dtos/productos.dto';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class ProductosService {
    private idCont = 1;
    private productos: Producto[] = [
        {
            id: 1,
            nombre: 'Prod A',
            descripcion: 'Descripcion producto A',
            precio: 6500,
            stock: 1,
            origen: 'China',
            imagen: '',
        },
        {
            id: 2,
            nombre: 'Prod B',
            descripcion: 'Descripcion producto B',
            precio: 7500,
            stock: 1,
            origen: 'Japon',
            imagen: '',
        },
    ];

    findAll() {
        return this.productos;
    }

    findOne(id: number) {
        const product = this.productos.find((item) => item.id === id);

        if (!product) {
            throw new NotFoundException(`El producto con id: #${id} no existe`);
        }
        return product;
    }

    create(payload: CreateProductDTO) {
        this.idCont = this.idCont + 1;
        const newProduct = {
            id: this.idCont,
            ...payload,
        };
        this.productos.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: UpdateProductDTO) {
        const product = this.findOne(id);
        if (product) {
            const index = this.productos.findIndex((item) => item.id === id);
            this.productos[index] = {
                ...product,
                ...payload,
            };
            return this.productos[index];
        }
        return null;
    }

    remove(id: number) {
        const index = this.productos.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`El producto #${id} no se encuentra`);
        }
        this.productos.splice(index, 1);
        return true;
    }
}