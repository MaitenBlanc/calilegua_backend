import { IsNotEmpty, IsString, IsNumber, IsUrl, IsPositive } from 'class-validator';
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


