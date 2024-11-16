import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comprador } from "./comprador.entity";
import { Exclude } from "class-transformer";

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

    @OneToOne(() => Comprador, (comprador) => comprador.operador, {
        nullable: true,
        eager: true,
    })
    @JoinColumn({ name: 'customer_id' })
    comprador: Comprador;
}