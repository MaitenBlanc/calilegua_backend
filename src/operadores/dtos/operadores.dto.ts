import { PartialType, OmitType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateOperadorDTO {
    @ApiProperty({ description: 'Id del operador' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly id: number;

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
}

export class UpdateOperadorDTO extends PartialType(
    OmitType(CreateOperadorDTO, ['id']),
) { }


