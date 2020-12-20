import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dish } from "src/restaurants/entities/dish.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User, UserRole } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateOrderInput, CreateOrderOutput } from "./dtos/create-order.dto";
import { GetOrdersInput, GetOrdersOutput } from "./dtos/get-orders.dto";
import { OrderItem, OrderItemOption } from "./entities/order-item.entity";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService {
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

        try{
            const restaurant = await this.restaurant.findOne(restaurantId)
            if(!restaurant){
                return {
                    ok: false,
                    error: "Restaurant not found"
                }
            }
            let orderFinalPrice = 0
            const orderItems: OrderItem[] = []
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
                let dishFinalPrice = dish.price;
    
                for(const itemOption of item.options) {
                    const dishOption = dish.options.find(dishOption => {
                        dishOption.name === itemOption.name
                    })
                    if(dishOption) {
                        if(dishOption.extra) {
                            // 옵션에 추가 비용이 O ex) 핫소스 추가: 200원
                            dishFinalPrice = dishFinalPrice + dishOption.extra
                        } 
                        else {
                            // 옵션에 추가 비용이 X
                            const dishOptionChoice = dishOption.choices.find(optionChoice => optionChoice.name === itemOption.choice )
                            if(dishOptionChoice) {
                                if(dishOptionChoice.extra) {
                                    // 옵션의 초이스에 추가 비용이 O  ex) 피자의 사이즈 중 M, L XL 등등
                            dishFinalPrice = dishFinalPrice + dishOptionChoice.extra
                                }
                                // 옵션의 초이스에도 추가 비용이 X ex) 기본맛, 매운맛, 아주 매운맛 등으로 변경
                                
                            }
                        }
                    }
                }
                orderFinalPrice = orderFinalPrice + dishFinalPrice
                const orderItem = await this.OrderItems.save(this.OrderItems.create({
                    dish,
                    options: item.options
                }))
                orderItems.push(orderItem)
            }
            const order = await this.orders.save(this.orders.create({
                customer,
                restaurant,
                total: orderFinalPrice,
                items: orderItems
            }))
            return {
                ok: true
            }
        }catch {
            return {
                ok: false,
                error: "Could not create order"
            }
        }
    }

    async getOrders(user:User, {status}: GetOrdersInput): Promise<GetOrdersOutput> {
        try{
            let orders: Order[]
            if(user.role === UserRole.Client) {
                orders = await this.orders.find({where: {
                    customer: user
                }})
            } else if(user.role === UserRole.Delivery) {
                orders = await this.orders.find({where: {
                    driver: user
                }})
            } else if(user.role === UserRole.Owner) {
                const restaurants = await this.restaurant.find({where: {
                    owner: user
                },
                relations: ['orders']
            })
            orders = restaurants.map(restaurant => restaurant.orders).flat(1)
    
        }
        
                return {
                    ok: true,
                    orders
                }
        } catch {
            return {
                ok: false,
                error: "Could not get orders"
            }
        }

    }
}

// 과제: 테스팅 만들어보기 #11.11