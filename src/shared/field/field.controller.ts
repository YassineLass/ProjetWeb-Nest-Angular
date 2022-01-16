import { Body, Controller, Post } from '@nestjs/common';
import { AddFieldDTO } from 'src/DTO/Field/add-field.DTO';
import { FieldEntity } from 'src/entities/field.entity';
import { FieldService } from './field.service';

@Controller('field')
export class FieldController {
    constructor(
        private _FieldService:FieldService
    ){}

    @Post()
    async addField(
        @Body() fieldData:AddFieldDTO
    ):Promise<FieldEntity>
    {
        return this._FieldService.addField(fieldData)
    }

}
