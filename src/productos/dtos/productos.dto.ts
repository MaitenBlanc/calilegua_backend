import { IsNotEmpty, IsString, IsNumber, IsUrl, IsPositive } from 'class-validator';
import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
    @ApiProperty({ description: 'Nombre del producto' })
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @ApiProperty({ description: 'Descripción del producto' })
    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @ApiProperty({ description: 'Precio del producto' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly precio: number;

    @ApiProperty({ description: 'Stock del producto' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly stock: number;

    @ApiProperty({ description: 'Origen del producto' })
    @IsString()
    @IsNotEmpty()
    readonly origen: string;

    @ApiProperty({ description: 'Imagen del producto' })
    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;

    @ApiProperty({ description: 'Fabricante del producto' })
    @IsNotEmpty()
    @IsPositive()
    readonly fabricanteId: number;
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


