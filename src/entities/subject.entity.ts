import { type } from "os";
import { SemesterEnum } from "src/enums/Semester.enum";
import {  StudyYearEnum } from "src/enums/study-year.enum";
import { TimeStamp } from "src/Generics/timestamp.entity";
import { UserEntity } from "src/entities/user.entity";
import { Column, Entity, IsNull, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { FieldEntity } from "./field.entity";
import { NoteEntity } from "./note.entity";

@Entity('Subjects')
export class SubjectEntity extends TimeStamp  {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        unique:true
    }
    )
    name:string


    @ManyToMany(
        type=>FieldEntity,
        field => field.subjects
    )
    @JoinTable()
    fields: FieldEntity[]

    @Column({
        enum:StudyYearEnum
    })
    study_year:number

    @Column({
        enum:SemesterEnum,
        default:SemesterEnum.First
    })
    semester:number;

    @OneToMany(
        type=>NoteEntity,
        note=>note.subject
    )

    notes:NoteEntity[]

    @ManyToOne(
        type=>UserEntity,
        teacher=>teacher.teaching_subjects,
        {onDelete:"CASCADE"}
    )
    @JoinColumn()
    teacher:UserEntity







}
