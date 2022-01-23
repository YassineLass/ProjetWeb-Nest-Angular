import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStudentDTO } from 'src/DTO/Student/update-Student.DTO';
import { FieldEntity } from 'src/entities/field.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { UserEntity } from 'src/entities/user.entity';
import { StudyYearEnum } from 'src/enums/study-year.enum';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentControlService {
    constructor(
        @InjectRepository(FieldEntity)
        private _fieldRepo: Repository<FieldEntity>,
        @InjectRepository(UserEntity)
        private _userRepo: Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private _subjectRepo: Repository<SubjectEntity>
    ) {}
    async changeYear(student_id:number,year:StudyYearEnum,user):Promise<Partial<UserEntity>>{
        if(user.role!=UserRoleEnum.ADMIN)
        throw new UnauthorizedException("Sorry you don't have permission")
        let check_student = await this._userRepo.findOne({
            id:student_id
        })
        if(!check_student){
            throw new NotFoundException("No Student with such ID")
        }
        if(check_student.role!=UserRoleEnum.STUDENT){
            throw new NotFoundException("No Student with such ID") 
        }
        if(check_student.study_year==year){
            delete check_student.password;
            delete check_student.salt;
            return check_student
        }
        check_student.study_year=year;
        check_student = await this._userRepo.save(check_student)
        delete check_student.password;
        delete check_student.salt;
        return check_student;
    }
    async changeField(student_id:number,field_name:string,user):Promise<Partial<UserEntity>>{
        if(user.role!=UserRoleEnum.ADMIN)
        throw new UnauthorizedException("Sorry you don' have permission")
        let check_student = await this._userRepo.findOne({
            relations:["field"],
            where: {id:student_id}
        })
        if(!check_student){
            throw new NotFoundException("No Student with such ID")
        }
        if(check_student.role!=UserRoleEnum.STUDENT){
            throw new NotFoundException("No Student with such ID") 
        }
        const check_field = await this._fieldRepo.findOne({
            name:field_name
        })
        if(!check_field){
            throw new NotFoundException("Field does not exist")
        }
        
        if(JSON.stringify(check_student)===JSON.stringify(check_field)){
            delete check_student.password;
            delete check_student.salt;
            delete check_student.field;
            return check_student;
        }
        check_student.field=check_field;
        check_student.field_name = check_field.name;
        check_student = await this._userRepo.save(check_student)
        delete check_student.password;
        delete check_student.salt;
        return check_student

    }
    async updateStudent(id:number,studentData:UpdateStudentDTO,user):Promise<UserEntity>{
        if(user.role!=UserRoleEnum.ADMIN){
            throw new UnauthorizedException("Sorry you don't have permission")
        }
        let data

        const student = await this._userRepo.preload({
            id,
            ...studentData,
            ...data,

        })
        if(!student){
            throw new NotFoundException("Sorry there is no student with this ID")
        }
        if(studentData.password){
            
            student.salt =  await bcrypt.genSalt()
            student.password = await bcrypt.hash(student.password,student.salt)
        }
        
        return await this._userRepo.save(student);

    }
    async deleteStudent(student_id:number,user){
        if(user.role!=UserRoleEnum.ADMIN){
            throw new UnauthorizedException("Sorry you don't have permission")
        }
        const check_student = await this._userRepo.findOne(student_id)
        if(!check_student){
            throw new NotFoundException("Sorry there is no student with this ID")
        }
        return await this._userRepo.remove(check_student)
    }


}

    
