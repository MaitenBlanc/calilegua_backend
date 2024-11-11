// import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Pedido } from "src/operadores/entities/pedido.entity";
// import { Producto } from "./producto.entity";

// @Entity()
// export class DetallePedido {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @CreateDateColumn({
//         type: 'timestamptz',
//         default: () => 'CURRENT_TIMESTAMP',
//     })
//     createAt: Date;

//     @UpdateDateColumn({
//         type: 'timestamptz',
//         default: () => 'CURRENT_TIMESTAMP',
//     })
//     updateAt: Date;

//     @Column({ type: 'int' })
//     cantidad: number;

//     @ManyToOne(() => Producto)
//     producto: Producto;

//         @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
//         pedido: Pedido;
// }