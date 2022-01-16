import { SemesterEnum } from "src/enums/Semester.enum";
import { TimeStamp } from "src/Generics/timestamp.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubjectEntity } from "./subject.entity";

@Entity('notes')
export class NoteEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    note:number

    @Column(
        {enum:SemesterEnum}
    )
    smester: number

    @ManyToOne(
        type=>UserEntity,
        user=>user.notes
    )
    student:UserEntity

    @ManyToOne(
        type=>SubjectEntity,
        s=>s.notes
    )
    subject:SubjectEntity;
}