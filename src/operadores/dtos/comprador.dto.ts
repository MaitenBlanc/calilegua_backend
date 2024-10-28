import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCompradorDTO {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: 'Nombre del comprador' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Apellido del comprador' })
    @IsString()
    @IsNotEmpty()
    apellido: string;

    @ApiProperty({ description: 'Teléfono del comprador' })
    @IsString()
    @IsNotEmpty()
    telefono: string;
}

export class UpdateCompradorDTO extends PartialType(
    OmitType(CreateCompradorDTO, ['id']),
) { }