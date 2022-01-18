import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from 'src/entities/field.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { jwtconstants } from './constants';
import { UserEntity } from '../entities/user.entity';
import { JwtStrategy } from './Startegy/passport-jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TeacherControlService } from './teacher-control/teacher-control.service';
import { StudentControlService } from './student-control/student-control.service';
import { TeacherControlController } from './teacher-control/teacher-control.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,FieldEntity,SubjectEntity]),
    // PassportModule.register({
    //   defaultStrategy:'jwt'
    // }),
    JwtModule.register({
      secret : jwtconstants.secret,
      signOptions : { expiresIn : 3600}
    })
  ],
  controllers: [UserController, TeacherControlController],
  providers: [UserService,JwtStrategy, TeacherControlService, StudentControlService]
})
export class UserModule { }
