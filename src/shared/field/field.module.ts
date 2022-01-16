import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from 'src/entities/field.entity';
import { FieldController } from './field.controller';
import { FieldService } from './field.service';

@Module({
  imports:[TypeOrmModule.forFeature([FieldEntity])],
  controllers: [FieldController],
  providers: [FieldService]
})
export class FieldModule {}
