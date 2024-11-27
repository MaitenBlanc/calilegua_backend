import { IsNotEmpty, IsString, IsNumber, IsUrl, IsPositive, IsOptional, Min, ValidateIf } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly precio: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly stock: number;

    @IsString()
    @IsNotEmpty()
    readonly origen: string;

    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;
}

export class UpdateProductDTO extends PartialType(
    OmitType(CreateProductDTO, ['nombre']),
) { }

// Eliminar producto
export class RemoveProductDTO {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
}

export class FilterProductsDTO {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @Min(0)
    precioMinimo: number;

    @ValidateIf((params) => params.precioMinimo)
    @IsPositive()
    precioMaximo: number;
}

