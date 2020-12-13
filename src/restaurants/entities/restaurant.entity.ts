import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

// @InputType({ isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {

    @Field(type => String)// 클라이언트가 요청을 할 때 오류 캐치
    @Column()  
    @IsString()
    @Length(5,10)
    name: string // 코딩할 때 오류 캐치

    @Field(type => String)
    @Column()
    @IsString()
    bgImage: string;

    @Field(type => String, {defaultValue: "강남"})
    @Column()
    @IsString()
    address:string;

    @Field(type => Category)
    @ManyToOne(type => Category, category => category.restaurants)
    category: Category;
}