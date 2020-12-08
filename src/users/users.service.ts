import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { VerifyEmailOutput } from "./dtos/verify-email.dto";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Verification) 
        private readonly verification: Repository<Verification>,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ){
        
    }

    async createAccount({email, password, role}: CreateAccountInput): Promise<{ ok: boolean; error?: string}>{
        try{
            const exists = await this.users.findOne({email})
            console.log(exists)
            if(exists){
                return {ok: false, error: "There is a user with that email already"}
            }
            const user = await this.users.save(this.users.create({email, password, role }))
            const verification = await this.verification.save(this.verification.create({
                user
            }))
            this.mailService.sendVerificationEmail(user.email, verification.code)
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
            const user = await this.users.findOne({email},{select: ["id",'password']})
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
            const token = this.jwtService.sign(user.id)
            return {
                ok: true,
                token
            }
        } catch (error) {
            return {
                ok: false,
                error,
                
            }
        }
    }

    async findById(id:number): Promise<UserProfileOutput> {
        try{
        const user = await this.users.findOneOrFail({ id })
            return {
                ok: true,
                user
            }
        } catch (error) {
            return { ok: false, error: "User Not Found"}
        }
    }

    async editProfile(userId: number, {email,password}: EditProfileInput) {
        try{
            const user = await this.users.findOne(userId)
            if(email){
                user.email = email
                user.verified = false;
                const verification = await this.verification.save(this.verification.create({user}))

                this.mailService.sendVerificationEmail(user.email,verification.code)
            }
            if(password){
                user.password = password
            }
            await this.users.save(user)
            return{
                ok: true 
            }
            
        }
        catch(error){
            return {
                ok: false,
                error: "Could not update profile."
            }
        }
    }
    async verifyEmail(code: string): Promise<VerifyEmailOutput> {
        try{
            const verification = await this.verification.findOne({code}, {relations: ['user']})
            if(verification){
               verification.user.verified = true
               await this.users.save(verification.user)
               await this.verification.delete(verification.id)
               return { ok: true }
            }
            return { ok: false, error: "Verification not found"}
        } catch(error){
            return {ok: false, error}
        }
        
    }
}