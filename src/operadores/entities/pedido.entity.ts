import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Producto } from "src/productos/entities/producto.entity";
import { Comprador } from "./comprador.entity";

@Schema({ collection: 'pedidos' })
export class Pedido extends Document {
    @Prop({ required: true, default: () => new Date() })
    fechaPedido: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: Producto.name }] })
    productos: Types.Array<Types.ObjectId>;

    @Prop({ type: Types.ObjectId, ref: Comprador.name })
    comprador: Types.ObjectId;

}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);