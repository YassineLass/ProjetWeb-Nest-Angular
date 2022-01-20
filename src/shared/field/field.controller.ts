import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/User.decorator';
import { AddFieldDTO } from 'src/DTO/Field/add-field.DTO';
import { FieldEntity } from 'src/entities/field.entity';
import { JwtAuthGuard } from 'src/User/Guards/jwt-auth.guard';
import { FieldService } from './field.service';

@Controller('field')
export class FieldController {
    constructor(
        private _FieldService:FieldService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async addField(
        @Body() fieldData:AddFieldDTO,
        @User() user:any
    ):Promise<FieldEntity>
    {
        return this._FieldService.addField(fieldData,user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getFields(
        @User() user
    ): Promise<FieldEntity[]>{
        return await this._FieldService.getFields(user)
    }

}
