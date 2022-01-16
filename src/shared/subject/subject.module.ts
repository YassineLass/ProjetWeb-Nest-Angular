import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from 'src/entities/field.entity';
import { SubjectEntity } from 'src/entities/subject.entity';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports:[TypeOrmModule.forFeature([SubjectEntity,FieldEntity])],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
 