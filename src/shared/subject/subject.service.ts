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
        const fields = subject.fields
        console.log(fields)
        delete subject.fields
        const new_subject = await this._subjectRepo.create({
            ...subject

        })
        const field_list = []
        for(const f in fields){
            const check_field = await this._fieldRepo.findOne({name:fields[f]})
            console.log(f)
            if(!check_field)
            throw new NotFoundException('field not found :',f)
            field_list.push(fields[f])
        }
        new_subject.fields = field_list

        return await this._subjectRepo.save(new_subject)
    }
    async getSubjects_By_Field(field:string){
        const check_field = await this._fieldRepo.findOne({name:field})
        if(!check_field)
        throw new NotFoundException('field not found :')

        const subjects = await this._subjectRepo.find({
            relations:["fields"],
            
        })
        console.log(subjects)
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
