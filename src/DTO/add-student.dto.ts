import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class AddStudentDTO {

    @IsNotEmpty()
    @IsString()
    firstname : string;

    @IsNotEmpty()
    @IsString()
    lastname : string;

    @IsNotEmpty()
    @IsString()
    birthdate : Date;

    @IsNotEmpty() 
    @IsNumber()
    @Min(0)
    @Max(99999999)
    CIN : number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(10)
    yearOfStudy : number;

    @IsNotEmpty()
    @IsString()
    field : string;
}

