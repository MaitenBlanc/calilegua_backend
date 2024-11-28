import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { DireccionesDTO } from "../dtos/compradores.dto";

@Schema({ collection: 'compradores' })
export class Comprador {
    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    apellido: string;

    @Prop()
    telefono: string;

    @Prop({
        type: [
            {
                calle: { type: String },
                numero: { type: String },
                ciudad: { type: String },
            },
        ],
    })
    direcciones: Types.Array<Record<string, DireccionesDTO>>;
}

export const CompradorSchema = SchemaFactory.createForClass(Comprador);