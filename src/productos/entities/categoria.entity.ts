import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'categorias' })
export class Categoria extends Document {
    @Prop({ require: true })
    nombre: string;

    @Prop()
    imagen: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);