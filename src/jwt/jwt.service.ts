import { Inject, Injectable } from '@nestjs/common';
import { options } from 'joi';
import { JwtModuleOptions } from './interfaces/jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModule } from './jwt.module';

@Injectable()
export class JwtService {
    constructor (
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {
            console.log(options)
        }
    
    hello(){
        console.log("hello")
    }
}
