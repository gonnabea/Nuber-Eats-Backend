
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
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
    @Args('input') createRestaurantInput: CreateRestaurantDto
    ):Promise<boolean>{
       try{
        await this.restaurantService.createRestaurant(createRestaurantInput)
        return true
       }catch(e){
           console.log(e)
           return false
       }
    }

    @Mutation(returns => Boolean)
    async updateRestaurant(
        @Args('input') updateRestaurantDto: UpdateRestaurantDto
    ){
        return true
    }
}