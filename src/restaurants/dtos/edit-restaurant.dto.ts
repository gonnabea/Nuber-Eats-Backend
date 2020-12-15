import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Restaurant } from "../entities/restaurant.entity";
import { CreateRestaurantInput } from "./create-restaurant.dto";

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {

}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput {}