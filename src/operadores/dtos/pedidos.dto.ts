import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Producto } from 'src/productos/entities/producto.entity';
import { Comprador } from '../entities/comprador.entity';

export class CreatePedidoDTO {
    // @ApiProperty({ description: 'Fecha del pedido, asignada automáticamente', required: false })
    // readonly fechaPedido?: Date;

    @ApiProperty({ description: 'Lista de productos en el pedido' })
    @IsArray()
    @IsNotEmpty()
    readonly productos: string[];

    @ApiProperty({ description: 'ID del comprador' })
    @IsString()
    @IsNotEmpty()
    readonly comprador: string;
}

export class UpdatePedidoDTO extends PartialType(
    OmitType(CreatePedidoDTO, ['productos'])) { }

export class AddProductsToOrderDTO {
    @IsArray()
    @IsNotEmpty()
    readonly productsIds: string[];
}