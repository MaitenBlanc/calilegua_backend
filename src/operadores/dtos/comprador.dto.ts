import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompradorDTO {
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

export class UpdateCompradorDTO extends PartialType(CreateCompradorDTO) { }