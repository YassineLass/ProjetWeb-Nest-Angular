import { type } from "os";
import { FieldEntity } from "src/entities/field.entity";
import { NoteEntity } from "src/entities/note.entity";
import { SubjectEntity } from "src/entities/subject.entity";
import { StudyYearEnum } from "src/enums/study-year.enum";
import { UserRoleEnum } from "src/enums/user-role.enum";
import { TimeStamp } from "src/Generics/timestamp.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class UserEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:55,
        unique:true,
    })
    username:string;

    @Column({
        unique:true
    })
    email: string;
    

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
       enum: UserRoleEnum,
       default:UserRoleEnum.STUDENT
    }
    )
    role: string;

    @Column(
        {enum:StudyYearEnum,
        nullable:true}
    )
    study_year: number;
    
    @OneToMany(
        type=>NoteEntity,
        note=>note.student
    )
    notes:NoteEntity[]

    @ManyToOne(
        type=>FieldEntity,
        f=>f.students
    )
    field:FieldEntity;
    
    @Column({
        nullable:true
    })
    field_name:string

    @OneToMany(
        type=>SubjectEntity,
        s=>s.teacher
    )
    teaching_subjects:SubjectEntity[]


}