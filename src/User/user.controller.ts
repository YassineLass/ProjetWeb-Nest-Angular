import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './DTO/login.DTO';
import { UserSubscibeDTO } from './DTO/user-subscribe.DTO';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private _userService:UserService,
    ) {

    }

    @Post('student')

    async registerStudent( @Body() userData: UserSubscibeDTO): Promise<Partial<UserEntity>>{
        return await this._userService.registerStudent(userData);
    }
    @Post('admin')
    async registerAdmin( @Body() userData: UserSubscibeDTO): Promise<Partial<UserEntity>>{
        return await this._userService.registerAdmin(userData);
    }
    @Post('login')

    async login(
        @Body() loginData :LoginDTO
    ){
        return this._userService.login(loginData)
    }

}
