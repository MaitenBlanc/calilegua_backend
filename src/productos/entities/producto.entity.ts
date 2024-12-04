import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Fabricante } from "./fabricante.entity";
import { Categoria } from "./categoria.entity";

@Schema({ collection: 'productos' })
export class Producto extends Document {
    @Prop({ required: true })
    nombre: string;

    @Prop()
    descripcion: string;

    @Prop({ type: Number, index: true })
    precio: number;

    @Prop({ type: Number })
    stock: number;

    @Prop()
    origen: string;

    @Prop()
    imagen: string;

    // @Prop(
    //     raw({
    //         nombre: { type: String },
    //         imagen: { type: String },
    //     }),
    // )
    // categoria: Record<string, DireccionesDTO>;
    // @Prop({ type: [CategoriaSchema] })
    // categoria: Types.Array<Categoria>;
    @Prop({ type: [Types.ObjectId], ref: Categoria.name })
    categoria: Types.Array<Types.ObjectId>;

    @Prop({ type: [Types.ObjectId], ref: Fabricante.name })
    fabricante: Types.Array<Types.ObjectId>;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
ProductoSchema.index({ price: 1, stock: -1 });