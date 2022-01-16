import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateTeacherDTO {
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
    @IsString()
    field : string;
}