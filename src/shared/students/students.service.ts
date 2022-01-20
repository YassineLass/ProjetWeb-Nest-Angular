import { Injectable, NotFoundException } from '@nestjs/common';
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
        private _studentRepo:Repository<UserEntity>
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
                                                .select(["Users.id","Users.username","Users.email","Users.field_name","fields"])
                                                .where("Users.role = :role",{role:UserRoleEnum.STUDENT})
                                                .getMany()
        return students                                        
        

    }
    async getStudenstBySubject(){}
    

}
