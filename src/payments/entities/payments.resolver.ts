import { Mutation, Resolver } from "@nestjs/graphql";
import { Payment } from "./payment.entity";

@Resolver(of => Payment)
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService
    )
    @Mutation(returns => )
}