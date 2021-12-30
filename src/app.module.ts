import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './shared/student/student.module';
import { TeacherModule } from './shared/teacher/teacher.module';


import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
dotenv.config()
@Module({
  imports: [StudentModule,
     TeacherModule,
     ConfigModule.forRoot({
       isGlobal:true,
     }),
     TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host : 'localhost',
        port: 5432,
        username: 'postgres',
        password : 'admin',
        database: 'unimanage',
        entities : ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }
     )
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
