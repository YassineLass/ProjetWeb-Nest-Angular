import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/User.decorator';
import { JwtAuthGuard } from 'src/User/Guards/jwt-auth.guard';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(
        private _studentService:StudentsService
    ){}
    @Get()
    @UseGuards(JwtAuthGuard)
    async getSubjects(
        @User() student
    ){
        return this._studentService.getSubjects(student)
    }

}
