import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreatePedidoDTO {
    @ApiProperty({ description: 'Id del comprador' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly compradorId: number;
}

export class UpdatePedidoDTO extends PartialType(CreatePedidoDTO) { }


