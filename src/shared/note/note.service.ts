import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from 'src/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private _noteRepo:Repository<NoteEntity>
    ){}

    async addNote(){}
}
