import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/entities/note.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports:[TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
