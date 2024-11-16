import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Fabricante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    nombre: string;

    @Column({ type: 'varchar', length: 255 })
    direccion: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar' })
    imagen: string;

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

    @OneToMany(() => Producto, (product) => product.fabricante, { eager: true })
    products: Producto[];
}