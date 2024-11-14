import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOperadorDTO {
    @ApiProperty({ description: 'Correo electrónico del operador' })
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ description: 'Password del operador' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ description: 'Rol del operador' })
    @IsString()
    @IsNotEmpty()
    readonly role: string;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ description: 'Verificación del comprador' })
    readonly compradorId: number;
}

export class UpdateOperadorDTO extends PartialType(CreateOperadorDTO) { }


