import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFabricanteDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly direccion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly imagen: string;
}

export class UpdateFabricanteDTO extends PartialType(CreateFabricanteDTO) { }