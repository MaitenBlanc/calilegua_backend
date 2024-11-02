import { Producto } from "src/productos/entities/producto.entity";
import { Operador } from "./operador.entity";

export class Pedido {
    id: number;
    date: Date;
    operador: Operador;
    products: Producto[];
}