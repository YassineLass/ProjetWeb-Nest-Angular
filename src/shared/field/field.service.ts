import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddFieldDTO } from 'src/DTO/Field/add-field.DTO';
import { FieldEntity } from 'src/entities/field.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FieldService {
    constructor(
        @InjectRepository(FieldEntity)
        private _fieldRepo:Repository<FieldEntity>
    ){}

    async addField(field:AddFieldDTO):Promise<FieldEntity>{
        
        return await this._fieldRepo.save(field);
    }
    
}
