import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldEntity } from 'src/entities/field.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(FieldEntity)
        private _fieldRepo:Repository<FieldEntity>,
        @InjectRepository(UserEntity)
        private _studentRepo:Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private _subjectRepo:Repository<SubjectEntity>
    ){}

    async getSubjects(user){
        
        const  student = await this._studentRepo.findOne({id:user.id})
        console.log(student)
        const field = await this._fieldRepo.findOne({
            relations:["subjects","subjects.teacher"],
            where:{name:student.field_name}
        })
        if (!field)
        throw new NotFoundException('Sorry field name does not exist ')
        const firstSemester = []
        const secondSemester = []
        console.log(field)
        for( const s in field.subjects){
            console.log(field.subjects[s])
            if(field.subjects[s]['study_year']==student.study_year){
                if(field.subjects[s].teacher!=null){
                    delete field.subjects[s].teacher.password;
                    delete field.subjects[s].teacher.salt;
                }
                if(field.subjects[s]['semester']==1){
                    firstSemester.push(field.subjects[s])
                    
                }
                else{
                    secondSemester.push(field.subjects[s])
                }
            }
        }
        return {
            id:student.id,
            name:student.username,
            field: student.field_name,

            
            subjects: {
                firstSemester:firstSemester,
                secondSemester:secondSemester
            }
        }
    }
    async getStudents():Promise<Partial<UserEntity>[]>{
        const students = await this._studentRepo.createQueryBuilder("Users")
                                                .leftJoin("Users.field","fields")
                                                .select(["Users.id","Users.username","Users.email","Users.field_name","Users.study_year","fields"])
                                                .where("Users.role = :role",{role:UserRoleEnum.STUDENT})
                                                .getMany()
        return students                                        
        

    }
    async getStudenstBySubject(subject_id:number,user){
        if(user.role==UserRoleEnum.STUDENT){
            throw new UnauthorizedException("Sorry you don't have permission")

        }
        // const check_subject= await  this._subjectRepo.findOne({
        //     relations:["fields","fields.students"],
        //     where:{id:subject_id}
        // })
        // if(!check_subject){
        //     throw new NotFoundException("There is no subject with this ID")
        // }
        // // return check_subject
        // let students = []
        // for (const i in check_subject.fields){
        //     if(check_student.field.subjects[i].study_year==check_student.study_year){
        //         subjects.push(check_student.field.subjects[i])
        //     }
        // }
        // return subjects
        // const subjects = await this._subjectRepo.createQueryBuilder("Subjects")
        //                                         .leftJoin("Subjects.fields","fields")
        //                                         .leftJoin("fields.students","Users")
        //                                         .select(["fields"])
        //                                         .where("Subjects.id= :id",{id:subject_id})
        //                                         .getMany()
        // return subjects                                          
        const subjects = await this._studentRepo.createQueryBuilder("users")
                                                .leftJoinAndSelect("users.field","field")
                                                .leftJoinAndSelect("field.subjects","subjects")
                                                .select(["users.id","users.username"])
                                                .where("subjects.id= :id",{id:subject_id})
                                                .andWhere("subjects.study_year = users.study_year")
                                                .getMany()
        return subjects                                           
    }
    

}
