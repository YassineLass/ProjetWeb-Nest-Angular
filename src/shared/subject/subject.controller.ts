import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddSubjectDTO } from 'src/DTO/Subjects/add-Subject.DTO';
import { SubjectEntity } from 'src/entities/subject.entity';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {

    constructor(
        private _SubjectService:SubjectService
    ){}
    @Get('all')
    async getSubjects():Promise<SubjectEntity[]>{
        return this._SubjectService.getAllSubjects()
    }
    @Post()
    async addSubject(
        @Body() subjectdata:AddSubjectDTO
    ){
        return this._SubjectService.addSubject(subjectdata)
    }
    @Get(':field')
    async getSubjectsByField(
        @Param('field') field :string
    ){
        return this._SubjectService.getSubjects_By_Field(field)
    }

   
}
