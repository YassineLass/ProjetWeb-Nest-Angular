import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddFieldDTO } from 'src/DTO/Field/add-field.DTO';
import { FieldEntity } from 'src/entities/field.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class FieldService {
    constructor(
        @InjectRepository(FieldEntity)
        private _fieldRepo:Repository<FieldEntity>
    ){}

    async addField(field:AddFieldDTO,user):Promise<FieldEntity>{
        if(user.role!=UserRoleEnum.ADMIN)
        throw new UnauthorizedException("Sorry you don't have permission")
        return await this._fieldRepo.save(field);
    }
    
}
