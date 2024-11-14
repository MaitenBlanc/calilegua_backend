import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Fabricante } from "./fabricante.entity";
import { Categoria } from "./categoria.entity";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'varchar' })
    origen: string;

    @Column({ type: 'varchar' })
    imagen: string;

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

    @ManyToOne(() => Fabricante, (fabricante) => fabricante.products)
    fabricante: Fabricante;

    @ManyToMany(() => Categoria, (categoria) => categoria.productos)
    categorias: Categoria[];
}