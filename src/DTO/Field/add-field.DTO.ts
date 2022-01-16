import { IsNotEmpty, IsString } from "class-validator";

export class AddFieldDTO {
    @IsNotEmpty()
    @IsString()
    name:string
}