import { Injectable } from '@nestjs/common';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class ProductosService {
    private idCont = 1;
    private productos: Producto[] = [
        // podriamos darle un tipo :ANY a nuestro vector de productos pero seria muy genérico
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
}
