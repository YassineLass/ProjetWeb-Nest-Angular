import { IsEAN, IsEmail, IsNotEmpty } from "class-validator";

export class UserSubscibeDTO {
    @IsNotEmpty()
    username:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

    
}