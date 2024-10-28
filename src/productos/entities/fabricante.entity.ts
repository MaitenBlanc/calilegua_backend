import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fabricante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'varchar', length: 255 })
    direccion: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar' })
    imagen: string;
}