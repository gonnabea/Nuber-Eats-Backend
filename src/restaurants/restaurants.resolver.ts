
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver(of => Restaurant)
export class RestaurantResolver { 
    @Query(returns => [Restaurant])
    myRestaurant(@Args("veganOnly") veganOnly: boolean): Restaurant[] {
    return []
}
    @Mutation(returns => Boolean)
    createRestaurant(
    // @Args('name') name:string,
    // @Args('isVegan') isVegan:boolean,
    // @Args('address') address:string,
    // @Args('ownersName') ownerssName:string
    @Args() createRestaurantInput: CreateRestaurantDto
    ):boolean{
        console.log(createRestaurantInput)
        return true
    }
}