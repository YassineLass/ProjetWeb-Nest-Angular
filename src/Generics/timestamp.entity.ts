import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

 export class TimeStamp {
      @CreateDateColumn({
           update:false,
      })
        createdAt : Date;

        @UpdateDateColumn()
        updatedAt : Date;

        @DeleteDateColumn()
        deletedAt : Date;
 }