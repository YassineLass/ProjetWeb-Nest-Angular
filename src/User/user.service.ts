import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscibeDTO } from './DTO/user-subscribe.DTO';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { LoginDTO } from './DTO/login.DTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private _UserRepo: Repository<UserEntity>,
        private _jwtService: JwtService
    ) {

    }


    async registerStudent(userData: UserSubscibeDTO): Promise<Partial<UserEntity>> {

        const username = userData.username;
        const email = userData.email;
        const check = await this._UserRepo.findOne({
            where: [
                { username: username },
                { email: email }
            ]
        })
        console.log(check)
        if (check) {
            throw new UnauthorizedException('username or email already exists')
        }
        const user = this._UserRepo.create({
            ...userData
        })
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        user.role = UserRoleEnum.STUDENT;
        try {

            await this._UserRepo.save(user)
        }
        catch (e) {
            throw new ConflictException('Error')
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        }

    }
    async registerAdmin(userData: UserSubscibeDTO): Promise<Partial<UserEntity>> {

        const username = userData.username;
        const email = userData.email;
        const check = await this._UserRepo.findOne({
            where: [
                { username: username },
                { email: email }
            ]
        })
        console.log(check)
        if (check) {
            throw new UnauthorizedException('username or email already exists')
        }
        const user = this._UserRepo.create({
            ...userData
        })
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        user.role = UserRoleEnum.ADMIN;
        try {

            await this._UserRepo.save(user)
        }
        catch (e) {
            throw new ConflictException('Error')
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        }

    }

    async login(loginData: LoginDTO) {
        const user = await this._UserRepo.findOne({
            where: [{ username: loginData.username },
            { email: loginData.username }]

        })
        if (!user) {
            throw new NotFoundException('Please check your Inputs :)');
        }
        const hashedpassword = await bcrypt.hash(loginData.password, user.salt);
        if (hashedpassword === user.password) {
            const payload = {
                username: user.username,
                email: user.email,
                id: user.id,
                role: user.role,
            }
            const jwt = await this._jwtService.sign(payload)

            return {
                "access_token": jwt
            }
        }
        else {
            throw new NotFoundException('Please check your Inputs :)')
        }

    }
}
