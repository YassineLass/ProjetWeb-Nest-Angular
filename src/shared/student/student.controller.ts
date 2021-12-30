import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AddStudentDTO } from 'src/DTO/add-student.dto';
import { UpdateStudentDTO } from 'src/DTO/Student/update-Student.DTO';
import { StudentEntity } from 'src/entities/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
constructor(
    private _studentService : StudentService,
){}
@Get()
async getStudents(): Promise<StudentEntity[]> {
    return await this._studentService.getStudent();
}

@Post()
async addStudent(@Body() AddStudentDTO : AddStudentDTO): Promise<StudentEntity> {
    return await this._studentService.addStudent(AddStudentDTO);
}

@Patch(':id')
async updateStudent(
    @Body() UpdateStudentDTO:UpdateStudentDTO,
    @Param('id',ParseIntPipe) id
): Promise<StudentEntity>{
    return await this._studentService.updateStudent(id,UpdateStudentDTO);  
}

@Delete(':id')

async deleteStudent(
    @Param('id',ParseIntPipe) id
) {
    return await this._studentService.deleteStudent(id);
}

}
