import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateDetallePedidoDTO {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'Id del pedido' })
    readonly pedidoId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'Id del producto' })
    readonly productoId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'Cantidad de productos del pedido' })
    readonly cantidad: number;
}

export class UpdateDetallePedidoDTO extends PartialType(CreateDetallePedidoDTO) { }