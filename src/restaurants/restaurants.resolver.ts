
import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class RestaurantResolver { 
    @Query(returns => Boolean) // 그래프큐엘 타입 (필수)
    isPizzaGood():Boolean { // 타입스크립트 타입 (선택_)
        return true
    }
}