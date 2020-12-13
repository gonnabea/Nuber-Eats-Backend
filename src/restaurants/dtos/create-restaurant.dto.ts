import { InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Restaurant } from "../entities/restaurant.entity";

// DTO: Data Tansfer Object

@InputType()
export class CreateRestaurantInput extends OmitType(Restaurant, ["id", "category", "owner"], InputType) {}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}