import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addNoteDTO } from 'src/DTO/note/add-note.DTO';
import { NoteEntity } from 'src/entities/note.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private _noteRepo:Repository<NoteEntity>,
        @InjectRepository(SubjectEntity)
        private _subjectRepo: Repository<SubjectEntity>,
        @InjectRepository(UserEntity)
        private _studentRepo: Repository<UserEntity>
    ){}

    async addGrade(data:addNoteDTO,user){
        if (user.role == UserRoleEnum.STUDENT){
            throw new UnauthorizedException ("Sorry you don't have permission ")
        }
        if((data.note>20)||(data.note<0)){
            throw new ConflictException("The grade must be in range [0..20] ")
        }
        const check_subject = await this._subjectRepo.findOne({
            id:data.subject_id
        })
        if(!check_subject){
            throw new NotFoundException("There is no subject with this ID")
        }
        const check_student = await this._studentRepo.findOne({
            id:data.student_id
        })
        if(!check_student){
            throw new NotFoundException("There is no student with this ID")
        }
        const grade = await this._noteRepo.create({
            note:data.note
        })
        grade.student = check_student;
        grade.subject = check_subject;
        const new_grade = await this._noteRepo.save(grade)
        delete new_grade.student.password
        delete new_grade.student.salt
        return new_grade


    }
}
