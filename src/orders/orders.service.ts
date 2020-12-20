import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dish } from "src/restaurants/entities/dish.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateOrderInput, CreateOrderOutput } from "./dtos/create-order.dto";
import { OrderItem } from "./entities/order-item.entity";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orders: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly OrderItems: Repository<OrderItem>,
        @InjectRepository(Restaurant)
        private readonly restaurant: Repository<Restaurant>,
        @InjectRepository(Dish)
        private readonly dishes: Repository<Dish>
    ) {}

    async createOrder(customer: User, {restaurantId,items}:CreateOrderInput): Promise<CreateOrderOutput> {
        const restaurant = await this.restaurant.findOne(restaurantId)
        if(!restaurant){
            return {
                ok: false,
                error: "Restaurant not found"
            }
        }
        for (const item of items){

            // dish: 데이터베이스에 저장되어 있는 음식 목록
            // item: 유저가 요청한 음식
            const dish = await this.dishes.findOne(item.dishId)

            if(!dish) {
               return {
                   ok: false,
                   error: "Dish not found."
               }
            }

            for(const itemOption of item.options) {
                const dishOption = dish.options.find(dishOption => {
                    dishOption.name === itemOption.name
                })
                if(dishOption) {
                    if(dishOption.extra) {
                        // 옵션에 추가 비용이 O ex) 핫소스 추가: 200원

                    } 
                    else {
                        // 옵션에 추가 비용이 X
                        const dishOptionChoice = dishOption.choices.find(optionChoice => optionChoice.name === itemOption.choice )
                        if(dishOptionChoice) {
                            if(dishOptionChoice.extra) {
                                // 옵션의 초이스에 추가 비용이 O  ex) 피자의 사이즈 중 M, L XL 등등

                            }
                            // 옵션의 초이스에도 추가 비용이 X ex) 기본맛, 매운맛, 아주 매운맛 등으로 변경
                            
                        }
                    }
                }
            }
            // await this.OrderItems.save(this.OrderItems.create({
            //     dish,
            //     options: item.options
            // }))
        }
        // const order = await this.orders.save(this.orders.create({
        //     customer,
        //     restaurant
        // }))
        // console.log(order)
    }

}