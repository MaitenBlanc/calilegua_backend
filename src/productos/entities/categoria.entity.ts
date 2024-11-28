import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'categorias' })
export class Categoria {
    @Prop({ require: true })
    nombre: string;

    @Prop()
    imagen: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);