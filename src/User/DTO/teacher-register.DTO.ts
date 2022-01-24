import { IsArray, isArray, IsEAN, IsEmail, IsNotEmpty } from "class-validator";

export class TeacherSubscibeDTO {
    @IsNotEmpty()
    username:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsArray()
    @IsNotEmpty()
    subject:string
    
}