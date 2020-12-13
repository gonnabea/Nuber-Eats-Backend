import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@InputType("CategoryInputType",{ isAbstract: true})
@ObjectType()
@Entity()
export class Category extends CoreEntity {

    @Field(type => String)// 클라이언트가 요청을 할 때 오류 캐치
    @Column()  
    @IsString()
    @Length(5,10)
    name: string // 코딩할 때 오류 캐치

    @Field(type => String)
    @Column()
    @IsString()
    coverImg: string;

    @Field(type => [Restaurant])
    @OneToMany(type => Restaurant, restaurant => restaurant.category)
    restaurants: Restaurant[]
}