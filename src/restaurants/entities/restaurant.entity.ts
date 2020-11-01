import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
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
    name: string // 코딩할 때 오류 캐치

    @Field(type => Boolean)
    @Column()
    @IsBoolean()
    @Length(5,10)
    isVegan: boolean;

    @Field(type => String)
    @Column()
    @IsString()
    address:string;

    @Field(type => String)
    @Column()
    @IsString()
    ownersName: string;

    @Field(type => String)
    @Column()
    @IsString()
    categoryName: string
}