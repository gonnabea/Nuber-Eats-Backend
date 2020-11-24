import { Inject, Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { JwtModuleOptions } from './interfaces/jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModule } from './jwt.module';

@Injectable()
export class JwtService {
    constructor (
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {
            console.log(options)
        } 
    
    sign(userId: number): string{
        return jwt.sign({id: userId}, this.options.privateKey)
    }
}
