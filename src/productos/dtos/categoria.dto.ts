import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoriaDTO {
    @ApiProperty({ description: 'Nombre del producto' })
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
}

export class UpdateCategoriaDTO extends PartialType(
    OmitType(CreateCategoriaDTO, ['nombre']),
) { }

export class RemoveCategoriatDTO {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
}