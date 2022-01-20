import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSubjectDTO } from 'src/DTO/Subjects/add-Subject.DTO';
import { UpdateSubjectDTO } from 'src/DTO/Subjects/update-subject.DTO';
import { FieldEntity } from 'src/entities/field.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectEntity)
        private _subjectRepo:Repository<SubjectEntity>,
        @InjectRepository(FieldEntity)
        private _fieldRepo : Repository<FieldEntity>

    ){ }

    async addSubject(subject:AddSubjectDTO):Promise<SubjectEntity>{
        const check = await this._subjectRepo.findOne({name:subject.name})
        
        if(check)
        throw new ForbiddenException('Subject name already exists ')
        const fields = subject.fieldstab
        delete subject.fieldstab
        const new_subject = await this._subjectRepo.create(
           {...subject}

        )
        const field_list:FieldEntity[] = []
        for(const f in fields){
            const check_field = await this._fieldRepo.findOne({name:fields[f]})
            console.log(f)
            if(!check_field)
            throw new NotFoundException('field not found :')
            field_list.push(check_field)
        }
        new_subject.fields = field_list

        return await this._subjectRepo.save(new_subject)
    }
    async getSubjects_By_Field(field:string){
        const check_field = await this._fieldRepo.findOne({name:field})
        if(!check_field)
        throw new NotFoundException('field not found :')
        const fileds:FieldEntity = await this._fieldRepo.findOne({
            relations:["subjects"],
            where:{name:field}
        })
        return fileds.subjects
    }
    async deleteSubject(id:number,user){
        if(user.role!=UserRoleEnum.ADMIN)
        throw new UnauthorizedException("Sorry you don't have permission")
        return await this._subjectRepo.delete(id)
    }
    async getAllSubjects():Promise<SubjectEntity[]>{
        return this._subjectRepo.find({
            relations:["teacher"]
        });
    }
    async updateSubject(id,subject_data:UpdateSubjectDTO,user){
        if(user.role!=UserRoleEnum.ADMIN)
        throw new UnauthorizedException("Sorry you don't have permission")

        const subject = await this._subjectRepo.findOne({
            relations:["fields"],
            where:{id:id}
        })
        if(!subject)
        throw new NotFoundException("There is no student with this ID")
        const fields = subject_data.fieldstab
        delete subject_data.fieldstab
        
        const field_list:FieldEntity[] = []
        for(const f in fields){
            const check_field = await this._fieldRepo.findOne({name:fields[f]})
            if(!check_field)
            throw new NotFoundException('field {fields[f]}not found :')
            field_list.push(check_field)
        }
        subject.fields = field_list

        return await this._subjectRepo.save(subject)

    }
}
