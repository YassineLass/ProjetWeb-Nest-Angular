import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  providers: [TeachersService],
  controllers: [TeachersController]
})
export class TeachersModule {}
