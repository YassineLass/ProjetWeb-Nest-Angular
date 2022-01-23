import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/User.decorator';
import { AddSubjectDTO } from 'src/DTO/Subjects/add-Subject.DTO';
import { SubjectEntity } from 'src/entities/subject.entity';
import { JwtAuthGuard } from 'src/User/Guards/jwt-auth.guard';
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
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deletesubject(
        @Param('id',ParseIntPipe) id:number,
        @User() user
    ){
        return this._SubjectService.deleteSubject(id,user)
    }

   
}
