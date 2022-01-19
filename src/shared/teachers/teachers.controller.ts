import { Controller, Get } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {

    constructor(
        private teacherService:TeachersService
    ){}

    @Get()
    async getAll():Promise<Partial<UserEntity>[]>{
        return await this.teacherService.getAll()
    }
}
