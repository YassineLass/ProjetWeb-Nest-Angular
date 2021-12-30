    import { TimeStamp } from "src/Generics/timestamp.entity";
import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";

    @Entity('Students')
    export class StudentEntity extends TimeStamp{
        @PrimaryGeneratedColumn()
        id : number ;

        @Column()
        firstname : string;

        @Column()
        lastname : string;

        @Column()
        birthdate : Date;

        @Column()
        CIN : number;

        @Column()
        yearOfStudy : number;

        @Column()
        field : string;

        



    }