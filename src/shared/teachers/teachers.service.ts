import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(UserEntity)
        private _teacherRepo:Repository<UserEntity>
    ){}

    async getAll():Promise<Partial<UserEntity>[]>{
        const teachers = await this._teacherRepo.find({
            relations:["teaching_subjects"],
            where:{role:UserRoleEnum.TEACHER}
        })
        
        for(const i in teachers){
            delete teachers[i].salt;
            delete teachers[i].password;
        }
        return teachers;
    }

    async deleteTeacher(id:number,user){
        if(user.role!=UserRoleEnum.ADMIN){
            throw new UnauthorizedException("Sorry you don't have permission")
        }
    }
    
}
