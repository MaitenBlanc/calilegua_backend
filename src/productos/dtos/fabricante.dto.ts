import { IsNotEmpty, IsString, IsUrl, IsEmail, IsNumber } from 'class-validator';
import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateFabricanteDTO {
    @ApiProperty({ description: 'Nombre del fabricante' })
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @ApiProperty({ description: 'Dirección del fabricante' })
    @IsString()
    @IsNotEmpty()
    readonly direccion: string;

    @ApiProperty({ description: 'Email del fabricante' })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ description: 'Imagen del fabricante' })
    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;
}

export class UpdateFabricanteDTO extends PartialType(
    OmitType(CreateFabricanteDTO, ['nombre']),
) { }

export class RemoveFabricanteDTO {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
}

