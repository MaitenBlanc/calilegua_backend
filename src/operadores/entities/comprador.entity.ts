import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { Operador } from "./operador.entity";
import { Pedido } from "./pedido.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Comprador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'varchar', length: 150 })
    apellido: string;

    @Column({ type: 'varchar', length: 50 })
    telefono: string;

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

    @OneToOne(() => Operador, (operador) => operador.comprador, {
        nullable: true
    })
    operador: Operador;

    @OneToMany(() => Pedido, (pedido) => pedido.comprador)
    pedidos: Pedido[];
}