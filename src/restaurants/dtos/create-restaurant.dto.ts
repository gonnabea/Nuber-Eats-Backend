import { Field, InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Restaurant } from "../entities/restaurant.entity";

// DTO: Data Tansfer Object

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, ["name", "coverImg", "address"], InputType) {

    @Field(type => String)
    categoryName: string
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}