import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsUrl,
    IsPositive,
    IsOptional,
    Min,
    ValidateIf,
    ValidateNested,
    IsMongoId,
    IsArray
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateCategoriaDTO } from './categorias.dto';
import { CreateFabricanteDTO } from './fabricantes.dto';

export class CreateProductDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly precio: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly stock: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly origen: string;

    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;

    @ApiProperty({ type: CreateFabricanteDTO })
    @IsNotEmpty()
    @IsMongoId({ each: true })
    // @ValidateNested({ each: true })
    @Type(() => CreateFabricanteDTO)
    readonly fabricante: CreateFabricanteDTO;

    @ApiProperty({ type: [CreateCategoriaDTO] })
    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    // @ValidateNested({ each: true })
    @Type(() => CreateCategoriaDTO)
    readonly categoria: CreateCategoriaDTO[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) { }

// Eliminar producto
export class RemoveProductDTO {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    readonly id: number;
}

export class FilterProductsDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsPositive()
    limit: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Min(0)
    offset: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Min(0)
    precioMinimo: number;

    @ApiProperty({ required: false })
    @ValidateIf((params) => params.precioMinimo)
    @IsPositive()
    precioMaximo: number;
}

