import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateStudentDTO {

    @IsOptional()
    @IsString()
    username : string;

    @IsOptional()
    @IsEmail()
    email:string;


    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    yearOfStudy : number;

    @IsOptional()
    @IsString()
    field : string;

    @IsOptional()
    @IsString()
    password:string;
}

