import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);