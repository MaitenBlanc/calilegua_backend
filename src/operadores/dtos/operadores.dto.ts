import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateOperadorDTO {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;
}

export class UpdateOperadorDTO extends PartialType(
    OmitType(CreateOperadorDTO, ['id']),
) { }


