import { type } from "os";
import {  StudyYearEnum } from "src/enums/study-year.enum";
import { TimeStamp } from "src/Generics/timestamp.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
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
    study_year:string

    @OneToMany(
        type=>NoteEntity,
        note=>note.subject
    )
    
    notes:NoteEntity[]

    @ManyToMany(
        type=>UserEntity,
        teacher=>teacher.teaching_subjects
    )
    teachers:UserEntity[]

    



}