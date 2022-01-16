import { IsNotEmpty, IsString } from "class-validator";
import { StudyYearEnum } from "src/enums/study-year.enum";

export class AddSubjectDTO {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    fields:string[]

    @IsNotEmpty()
    study_year:StudyYearEnum;
}