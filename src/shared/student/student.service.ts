import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { AddStudentDTO } from 'src/DTO/add-student.dto';
import { UpdateStudentDTO } from 'src/DTO/Student/update-Student.DTO';
import { StudentEntity } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private _studentRepository: Repository<StudentEntity>
        ) {
        }
    
    async getStudent(): Promise<StudentEntity[]>{
        return await this._studentRepository.find();
    }    

    async addStudent(s : AddStudentDTO): Promise<StudentEntity>{
        return await this._studentRepository.save(s);
    }

    async updateStudent(id:number ,s : UpdateStudentDTO): Promise<StudentEntity>{

        // used to update only one element 
        // TO update many elements in the same time we can use .update function instead of save
        const newStudent = await this._studentRepository.preload({
            id,
            ...s
        })
        if(!newStudent)
        throw new NotFoundException('Requested Student Not Found :(')

        return await this._studentRepository.save(newStudent);
        
    }

    async deleteStudent(id: number){
        // const s = await this._studentRepository.findOne(id); 
        // if(!s)
        // throw new NotFoundException('Sorry Requested Student does not exist ')
        // return await this._studentRepository.remove(s);


        return await this._studentRepository.delete(id);
    }
}
