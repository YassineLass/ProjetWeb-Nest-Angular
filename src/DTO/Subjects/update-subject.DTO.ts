import { IsArray, isArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StudyYearEnum } from "src/enums/study-year.enum";

export class UpdateSubjectDTO {
    @IsOptional()
    @IsString()
    name:string

    

    @IsArray()
    @IsOptional()
    fieldstab:string[]

    @IsOptional()
    study_year:number;

    @IsOptional()
    semester:number


}