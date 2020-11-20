import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken"
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly config: ConfigService
    ){}

    async createAccount({email, password, role}: CreateAccountInput): Promise<{ ok: boolean; error?: string}>{
        try{
            const exists = await this.users.findOne({email})
            if(exists){
                return {ok: false, error: "There is a user with that email already"}
            }
            await this.users.save(this.users.create({email, password, role }))
            return {ok: true}
        } catch(e){
            // make error
            return {ok: false, error: "Couldn't create account"}
        }
        
        //  & hash the password
    }

    async login({email, password}: LoginInput): Promise<{ ok: boolean, error?: string, token?: string}> {
        // 이메일로 유저찾기
        // 패스워드 맞는 지 확인
        // JWT 생성 후 유저에게 주기

        try{
            const user = await this.users.findOne({email})
            if(!user){
                return {
                    ok: false,
                    error: 'User not found',
                }
            }
            const passwordCorrect = await user.checkPassword(password)
            if(!passwordCorrect){
                return {
                    ok: false,
                    error: "Wrong Password"
                }
            }
            const token = jwt.sign({id: user.id}, this.config.get("SECRET_KEY"))
            return {
                ok: true,
                token: "lalalalalal"
            }
        } catch (error) {
            return {
                ok: false,
                error,
                
            }
        }
    }
}