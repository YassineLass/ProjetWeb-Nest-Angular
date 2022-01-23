import { IsNotEmpty } from "class-validator";

export class addNoteDTO {
    @IsNotEmpty()
    note:number

    @IsNotEmpty()
    subject_id:number;

    @IsNotEmpty()
    student_id:number;
    
}