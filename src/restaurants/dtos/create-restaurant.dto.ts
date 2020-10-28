import { ArgsType, Field, InputType } from "@nestjs/graphql";

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
    name: string

    @Field(type => Boolean)
    isVegan: boolean;

    @Field(type => String)
    address:string;

    @Field(type => String)
    ownersName: string;
}