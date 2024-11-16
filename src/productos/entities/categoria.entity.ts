import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

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

    @ManyToMany(() => Producto, (producto) => producto.categorias)
    @JoinTable({
        name: 'productos_categorias',
        joinColumn: {
            name: 'categoria_id',
        },
        inverseJoinColumn: {
            name: 'producto_id',
        },
    })
    productos: Producto[];
}