import { IsEAN, IsEmail, IsInt, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { StudyYearEnum } from "src/enums/study-year.enum";

export class StudentRegisterDTO {
    @IsNotEmpty()
    username:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    field_name:string

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    study_year:number

}