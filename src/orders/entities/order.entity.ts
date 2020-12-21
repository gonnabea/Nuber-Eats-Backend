import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Pending = 'Pending',
  // 레스토랑이 변경할 수 있는 상태
  Cooking = 'Cooking',
  Cooked = 'Cooked',
  // 배달원이 변경할 수 있는 상태
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field(type => User, { nullable: true })
  @ManyToOne(
    type => User,
    user => user.orders,
    { onDelete: 'SET NULL', nullable: true, eager: true },
  )
  customer?: User;

  @RelationId((order: Order) => order.customer)
  customerId: number;

  @Field(type => User, { nullable: true })
  @ManyToOne(
    type => User,
    user => user.rides,
    { onDelete: 'SET NULL', nullable: true, eager: true },
  )
  driver?: User;

  @RelationId((order: Order) => order.driver)
  driverId: number;

  @Field(type => Restaurant, { nullable: true })
  @ManyToOne(
    type => Restaurant,
    Restaurant => Restaurant.orders,
    { onDelete: 'SET NULL', nullable: true, eager: true },
  )
  restaurant?: Restaurant;

  @Field(type => [OrderItem])
  @ManyToMany(type => OrderItem, { eager: true })
  @JoinTable()
  items: OrderItem[];

  @Column({ nullable: true })
  @Field(type => Float, { nullable: true })
  @IsNumber()
  total?: number; // 총 결제금액

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  @Field(type => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
