import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/User.decorator';
import { AddSubjectDTO } from 'src/DTO/Subjects/add-Subject.DTO';
import { AddTeacherSubjectDTO } from 'src/DTO/Teacher/add-teacher-subject.DTO';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { TeacherControlService } from './teacher-control.service';

@Controller('control/teacher')
export class TeacherControlController {
    constructor(
        private _teacherControllService:TeacherControlService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async addSubject(
        @Body() data:AddTeacherSubjectDTO,
        @User() user
    ){
        return this._teacherControllService.addNewSubject(data.teacher_id,data.subject_name,user)
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteteacher(
        @Param('id', ParseIntPipe) id : number ,
        @User() user
    ) {
        return this._teacherControllService.deleteTeacher(id,user)
    }
    @Patch(':id')
    @UseGuards(JwtAuthGuard) 
    async updateTeacher(
        @Param('id',ParseIntPipe) id : number ,
        @User() user 
    ){
        // return this._teacherControllService.
    }
}
