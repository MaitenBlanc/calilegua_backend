import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCategoriaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    readonly imagen: string;
}

export class UpdateCategoriaDTO extends PartialType(CreateCategoriaDTO) { }