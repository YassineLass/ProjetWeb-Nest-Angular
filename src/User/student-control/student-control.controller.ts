import { Body, Controller, Delete, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/User.decorator';
import { UpdateStudentDTO } from 'src/DTO/Student/update-Student.DTO';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { StudentControlService } from './student-control.service';

@Controller('control/student')
export class StudentControlController {
    constructor(
        private _studentControlService:StudentControlService
    ) {}


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteStudent(
        @Param('id',ParseIntPipe) id:number,
        @User() user
    ){
        return this._studentControlService.deleteStudent(id,user)
    }
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateStudent(
        @Body() data:UpdateStudentDTO,
        @Param('id',ParseIntPipe) id:number,
        @User() user
    ):Promise<UserEntity>{
        return await this._studentControlService.updateStudent(id,data,user)
    }
}
