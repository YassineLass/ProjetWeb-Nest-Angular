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
        const fields = subject.fieldstab
        console.log(fields,'f')
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
    async deleteSubject(id:number){
        return await this._subjectRepo.delete(id)
    }
    async getAllSubjects():Promise<SubjectEntity[]>{
        return this._subjectRepo.find();
    }
    async updateSubject(){}
}
