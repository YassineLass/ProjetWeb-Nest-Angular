import { Controller, Get } from '@nestjs/common';
import { TeacherControlService } from './teacher-control.service';

@Controller('control/teacher')
export class TeacherControlController {
    constructor(
        private _teacherControllService:TeacherControlService
    ){}

    @Get()
    async addSubject(

    ){
        // return this._teacherControllService.addNewSubject()
    }
}
