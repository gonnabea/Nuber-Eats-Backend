
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantResolver { 
    constructor(private readonly restaurantService: RestaurantService){}
    @Query(returns => [Restaurant])
    myRestaurant(): Promise<Restaurant[]> {
    return this.restaurantService.getAll()
}
    @Mutation(returns => Boolean)
    async createRestaurant(
    // @Args('name') name:string,
    // @Args('isVegan') isVegan:boolean,
    // @Args('address') address:string,
    // @Args('ownersName') ownerssName:string
    @Args() createRestaurantInput: CreateRestaurantDto
    ):Promise<boolean>{
       try{
        await this.restaurantService.createRestaurant(CreateRestaurantDto)
        return true
       }catch(e){
           console.log(e)
           return false
       }
    }
}