import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'fabricantes' })
export class Fabricante extends Document {
    @Prop({ require: true })
    nombre: string;

    @Prop()
    direccion: string;

    @Prop()
    email: string;

    @Prop()
    imagen: string;
}

export const FabricanteSchema = SchemaFactory.createForClass(Fabricante);