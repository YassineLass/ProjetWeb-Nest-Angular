import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/User.decorator';
import { addNoteDTO } from 'src/DTO/note/add-note.DTO';
import { JwtAuthGuard } from 'src/User/Guards/jwt-auth.guard';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(
        private _noteSerivce:NoteService
    ){}

    @Post('new')
    @UseGuards(JwtAuthGuard)
    addGrade(
        @Body() data:addNoteDTO,
        @User() user
    ){
        return this._noteSerivce.addGrade(data,user)
    }
}
