import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";

// DTO: Data Tansfer Object

// @InputType()
// export class CreateRestaurantDto {
//     @Field(type => String)
//     name: string

//     @Field(type => Boolean)
//     isVegan: boolean;

//     @Field(type => String)
//     address:string;

//     @Field(type => String)
//     ownersName: string;
// }

@ArgsType()
export class CreateRestaurantDto {
    @Field(type => String)
    @IsString()
    @Length(5, 10) // 클라이언트가 요청을 할 때 오류 캐치
    name: string // 코딩할 때 오류 캐치

    @Field(type => Boolean)
    @IsBoolean()
    isVegan: boolean;

    @Field(type => String)
    @IsString()
    address:string;

    @Field(type => String)
    @IsString()
    ownersName: string;
}