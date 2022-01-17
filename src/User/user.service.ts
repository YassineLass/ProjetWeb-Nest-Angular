import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscibeDTO } from './DTO/user-subscribe.DTO';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { LoginDTO } from './DTO/login.DTO';
import { JwtService } from '@nestjs/jwt';
import { StudentRegisterDTO } from './DTO/Student-register.DTO';
import { FieldEntity } from 'src/entities/field.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private _UserRepo: Repository<UserEntity>,
        private _jwtService: JwtService,
        @InjectRepository(FieldEntity)
        private _fieldRepo:Repository<FieldEntity>
    ) {

    }


    async registerStudent(studentData: StudentRegisterDTO,user): Promise<Partial<UserEntity>> {
        if(user.role!=UserRoleEnum.ADMIN)
        throw new UnauthorizedException("Sorry you don't have permission")
        const username = studentData.username;
        const email = studentData.email;
        const check = await this._UserRepo.findOne({
            where: [
                { username: username },
                { email: email }
            ]
        })
        if (check) {
            throw new UnauthorizedException('username or email already exists')
        }
        const field_name = studentData.field_name
        const check_field = await this._fieldRepo.findOne({name:field_name})
        if(!check_field)
        throw new NotFoundException('field does not exist')
        const student = this._UserRepo.create({
            ...studentData
        })
        student.salt = await bcrypt.genSalt();
        student.password = await bcrypt.hash(student.password, student.salt);
        student.role = UserRoleEnum.STUDENT;
        try {

            await this._UserRepo.save(student)
        }
        catch (e) {
            throw new ConflictException('Error')
        }
        delete student.salt;
        delete student.password
        return student

    }
    async registerAdmin(userData: UserSubscibeDTO,user): Promise<Partial<UserEntity>> {
        if(user.role!=UserRoleEnum.ADMIN)
        throw new UnauthorizedException("Sorry you don't have permission")
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
        const admin = this._UserRepo.create({
            ...userData
        })
        admin.salt = await bcrypt.genSalt();
        admin.password = await bcrypt.hash(user.password, user.salt);
        admin.role = UserRoleEnum.ADMIN;
        try {

            await this._UserRepo.save(admin)
        }
        catch (e) {
            throw new ConflictException('Error')
        }
        delete admin.salt;
        delete admin.password
        return admin

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
