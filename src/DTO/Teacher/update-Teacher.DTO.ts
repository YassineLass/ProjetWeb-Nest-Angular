import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateTeacherDTO {

    @IsOptional()
    username:string;

    @IsEmail()
    @IsOptional()
    email:string;

    @IsOptional()
    password:string;

    @IsArray()
    @IsOptional()
    subjects:string[]
}

