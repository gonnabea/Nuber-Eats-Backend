import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @InputType({ isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number

    @Field(type => String)// 클라이언트가 요청을 할 때 오류 캐치
    @Column()  
    @IsString()
    @Length(5,10)
    name: string // 코딩할 때 오류 캐치

    @Field(type => Boolean, { nullable: true})
    @Column({ default: true})
    @IsOptional()
    @IsBoolean()
    isVegan: boolean;

    @Field(type => String, {defaultValue: "강남"})
    @Column()
    @IsString()
    address:string;


}