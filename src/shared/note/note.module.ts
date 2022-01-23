import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/entities/note.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { UserEntity } from 'src/entities/user.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports:[TypeOrmModule.forFeature([NoteEntity,SubjectEntity,UserEntity,])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
