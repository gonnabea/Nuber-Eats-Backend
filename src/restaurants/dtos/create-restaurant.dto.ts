import { ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Restaurant } from "../entities/restaurant.entity";

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

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ["id"], InputType) {}