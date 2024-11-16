import { Producto } from "src/productos/entities/producto.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Exclude } from "class-transformer";

@Entity()
export class DetallePedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @Exclude()
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    @Column({ type: 'int' })
    cantidad: number;

    @ManyToOne(() => Producto)
    producto: Producto;

    @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
    pedido: Pedido;
}