import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from 'src/entities/field.entity';
import { UserEntity } from 'src/entities/user.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports:[TypeOrmModule.forFeature([FieldEntity,UserEntity])],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
