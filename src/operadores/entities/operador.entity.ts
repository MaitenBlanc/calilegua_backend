import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comprador } from "./comprador.entity";

@Entity()
export class Operador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    password: string;

    @Column({ type: 'varchar', length: 50 })
    role: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    @OneToOne(() => Comprador, (comprador) => comprador.operador, {
        nullable: true,
    })
    @JoinColumn({ name: 'compradorId' })
    comprador: Comprador;

    @Column({ name: 'compradorId', nullable: true })
    compradorId: number;
}