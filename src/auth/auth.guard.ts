import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { AllowedRoles } from "./role.decorator";

// Guard는 true를 리턴하면 미들웨어가 진행되고 false를 리턴하면 멈춘다.
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context:ExecutionContext){
        // role이 undefined 라는 것은 로그인 된 유저가 없다는 뜻
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler())
        if(!roles){
            return true
        }
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const user:User = gqlContext['user']
        if (!user) {
            return false
        }
        if(roles.includes("Any")){
            return true
        }
        return roles.includes(user.role)
    }
}