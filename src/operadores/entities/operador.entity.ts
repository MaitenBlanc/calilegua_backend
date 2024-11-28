import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'operadores' })
export class Operador {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    role: string;
}

export const Operadorchema = SchemaFactory.createForClass(Operador);