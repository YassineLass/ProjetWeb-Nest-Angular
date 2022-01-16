import { type } from "os";
import { TimeStamp } from "src/Generics/timestamp.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubjectEntity } from "./subject.entity";

@Entity('fileds')
export class FieldEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        unique:true
    })
    name:string

    @ManyToMany(
        type=>SubjectEntity,
        subject=>subject.fileds
    )
    subjects : SubjectEntity[]

    @OneToMany(
        type=>UserEntity,
        Suser=>Suser.field,
    )
    students:UserEntity[]
}