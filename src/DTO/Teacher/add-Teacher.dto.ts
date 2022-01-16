import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class AddTeacherDTO {
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
    @IsString()
    field : string;
    
}