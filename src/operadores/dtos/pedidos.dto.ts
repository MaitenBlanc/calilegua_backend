import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePedidoDTO {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly producto: string;

    @IsString()
    @IsNotEmpty()
    readonly precio_total: number;
}

export class UpdatePedidoDTO extends PartialType(
    OmitType(CreatePedidoDTO, ['id']),
) { }


