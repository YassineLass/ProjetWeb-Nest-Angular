import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from 'src/entities/field.entity';
import { jwtconstants } from './constants';
import { UserEntity } from './entities/user.entity';
import { JwtStrategy } from './Startegy/passport-jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,FieldEntity]),
    // PassportModule.register({
    //   defaultStrategy:'jwt'
    // }),
    JwtModule.register({
      secret : jwtconstants.secret,
      signOptions : { expiresIn : 3600}
    })
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule { }
