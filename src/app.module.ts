import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';



import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/user.module';
import { SubjectModule } from './shared/subject/subject.module';
import { FieldModule } from './shared/field/field.module';
import { NoteModule } from './shared/note/note.module';
dotenv.config()
@Module({
  imports: [
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
     ),
     UserModule,
     SubjectModule,
     FieldModule,
     NoteModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
