import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { jwtconstants } from "../constants";
import { UserEntity } from "../../entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private _userRepo: Repository<UserEntity>
    ){
        super({
            jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : jwtconstants.secret
        })
    }

    async validate(payload: any){
        const user = await this._userRepo.findOne({username:payload.username})
        
        if(user) {
            const {password,salt,...result} = user
            return result;
        }
        else {
            throw new UnauthorizedException();
        }
    }
}