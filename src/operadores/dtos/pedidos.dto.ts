import { PartialType, OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePedidoDTO {
    @ApiProperty({ description: 'Id del pedido' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly id: number;

    @ApiProperty({ description: 'Producto pedido' })
    @IsString()
    @IsNotEmpty()
    readonly producto: string;

    @ApiProperty({ description: 'Monto total del pedido' })
    @IsString()
    @IsNotEmpty()
    readonly precio_total: number;
}

export class UpdatePedidoDTO extends PartialType(
    OmitType(CreatePedidoDTO, ['id']),
) { }


