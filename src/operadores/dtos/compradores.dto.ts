import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCompradorDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly apellido: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly telefono: string;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => DireccionesDTO)
    readonly direcciones: DireccionesDTO[];
}

export class DireccionesDTO {
    @IsString()
    calle: string;

    @IsString()
    numero: string;

    @IsString()
    ciudad: string;
}

export class UpdateCompradorDTO extends PartialType(CreateCompradorDTO) { }
