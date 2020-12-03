import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from "jsonwebtoken"
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './interfaces/jwt.interfaces';

import { JwtModule } from './jwt.module';

@Injectable()
export class JwtService {
    constructor (
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    ) {} 
    
    sign(userId: number): string{
        return jwt.sign({id: userId}, this.options.privateKey)
    }
    verify(token:string) {
        return jwt.verify(token, this.options.privateKey)
    }
}
