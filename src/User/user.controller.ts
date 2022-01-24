import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/User.decorator';
import { LoginDTO } from './DTO/login.DTO';
import { StudentRegisterDTO } from './DTO/Student-register.DTO';
import { UserSubscibeDTO } from './DTO/user-subscribe.DTO';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { UserService } from './user.service';
import { TeacherSubscibeDTO } from './DTO/teacher-register.DTO';

@Controller('user')
export class UserController {

    constructor(
        private _userService:UserService,
    ) {

    }

    @Post('register/student')
    @UseGuards(JwtAuthGuard)
    async registerStudent( 
        @Body() studentData: StudentRegisterDTO,
        @User() user
    ): Promise<Partial<UserEntity>>{
        return await this._userService.registerStudent(studentData,user);
    }
    @Post('register/admin')
    @UseGuards(JwtAuthGuard)
    async registerAdmin( 
        @Body() userData: UserSubscibeDTO,
        @User() user
        ): Promise<Partial<UserEntity>>{
        return await this._userService.registerAdmin(userData,user);
    }
    @Post('register/teacher')
    @UseGuards(JwtAuthGuard)
    async registerTeacher(
         @Body() teacherData:TeacherSubscibeDTO,
         @User() user
    ){
        return this._userService.registerTeacher(teacherData,user)
    }
    @Post('login')

    async login(
        @Body() loginData :LoginDTO
    ){
        return this._userService.login(loginData)
    }
    

}
