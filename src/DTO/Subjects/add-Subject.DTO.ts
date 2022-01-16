import { IsArray, isArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StudyYearEnum } from "src/enums/study-year.enum";

export class AddSubjectDTO {
    @IsNotEmpty()
    @IsString()
    name:string

    
    @IsOptional()
    @IsArray()
    fields:string[]

    @IsNotEmpty()
    study_year:StudyYearEnum;
}