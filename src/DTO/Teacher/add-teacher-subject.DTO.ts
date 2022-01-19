import { IsNotEmpty } from "class-validator";

export class AddTeacherSubjectDTO {

    @IsNotEmpty()
    teacher_id:number;

    
    @IsNotEmpty()
    subject_name:string;
}