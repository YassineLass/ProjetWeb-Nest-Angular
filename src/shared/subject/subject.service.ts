import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSubjectDTO } from 'src/DTO/Subjects/add-Subject.DTO';
import { FieldEntity } from 'src/entities/field.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
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
        throw new ForbiddenException('This Subject already exists ')
        const fileds = subject.fields
        console.log(subject)
        delete subject.fields
        const new_subject = await this._subjectRepo.create({
            ...subject

        })
        const field_list = []
        for(const f in fileds){
            const check_field = await this._fieldRepo.findOne({name:f})
            if(!check_field)
            throw new NotFoundException('field not found :',f)
            field_list.push(f)
        }
        new_subject.fileds = field_list

        return await this._subjectRepo.save(new_subject)
    }
    async getSubjects_By_Field(field:string):Promise<SubjectEntity[]>{
        const check_field = await this._fieldRepo.findOne({name:field})
        if(!check_field)
        throw new NotFoundException('field not found :')

        const subjects = await this._subjectRepo.find({
            relations:["filed"],
            
        })
        return subjects
    }
    async deleteSubject(id:number){
        return await this._subjectRepo.delete(id)
    }
    async getAllSubjects():Promise<SubjectEntity[]>{
        return this._subjectRepo.find();
    }
    async updateSubject(){}
}
