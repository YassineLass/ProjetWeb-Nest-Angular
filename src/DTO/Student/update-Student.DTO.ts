import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateStudentDTO {

    @IsOptional()
    @IsString()
    firstname : string;

    @IsOptional()
    @IsString()
    lastname : string;

    @IsOptional()
    @IsString()
    birthdate : Date;

    @IsOptional() 
    @IsNumber()
    @Min(0)
    @Max(99999999)
    CIN : number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    yearOfStudy : number;

    @IsOptional()
    @IsString()
    field : string;
}

