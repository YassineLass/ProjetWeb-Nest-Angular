import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldEntity } from 'src/entities/field.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherControlService {
    constructor(
        @InjectRepository(FieldEntity)
        private _fieldRepo: Repository<FieldEntity>,
        @InjectRepository(UserEntity)
        private _userRepo: Repository<UserEntity>,
        @InjectRepository(SubjectEntity)
        private _subjectRepo: Repository<SubjectEntity>
    ) { }



    async addNewSubject(teacherId: number, subject_name: string, user): Promise<Partial<UserEntity>> {
        if (user.role != UserRoleEnum.ADMIN)
            throw new UnauthorizedException("Sorry you don't have permission")
        const check_subject = await this._subjectRepo.findOne(
            { name: subject_name }
        )
        if (!check_subject) {
            throw new NotFoundException('Field name does not exist')
        }
        const check_teeacher = await this._userRepo.findOne(
            {
                relations: ["teaching_subjects"],
                where: { id: teacherId }
            }
        )
        if (!check_teeacher)
            throw new NotFoundException('No teacher with such ID')
        if (check_teeacher.role != UserRoleEnum.TEACHER) {
            throw new ConflictException('No teacher with such ID')
        }
        const subjects = check_teeacher.teaching_subjects
        if (subjects.some(s => s !== check_subject)) {
            subjects.push(check_subject)
            check_teeacher.teaching_subjects = subjects
            return await this._userRepo.save(check_teeacher)
        }
        else {
            return check_teeacher
        }
    }
    async deleteSubject(teacherId: number, SubjectId: number, user):Promise<Partial<UserEntity>> {
        if (user.role != UserRoleEnum.ADMIN) {
            throw new UnauthorizedException("Sorry you don't have permission")
        }
        const check_teacher = await this._userRepo.findOne(
            {
                relations: ["teaching_subjects"],
                where: { id: teacherId }
            }
        )
        if (!check_teacher)
            throw new NotFoundException('No teacher with such ID')
        if (check_teacher.role != UserRoleEnum.TEACHER) {
            throw new ConflictException('No teacher with such ID')
        }
        const check_subject = await this._subjectRepo.findOne({
            id:SubjectId
        })
        if(!check_subject){
            throw new NotFoundException('Subject does not exist ')
        }

        const subjetcs = check_teacher.teaching_subjects
        const index = subjetcs.indexOf(check_subject)
        //remove the subject from the subjects table 
        subjetcs.splice(index,1)
        check_teacher.teaching_subjects=subjetcs;
        return check_teacher

    }
}
