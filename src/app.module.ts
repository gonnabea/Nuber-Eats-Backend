import { Module } from '@nestjs/common';
import * as Joi from "joi" // 자바스크립트로 된 패키지 불러올 때 nest.js 방식으로 불러오기
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // .env 설정 for nest.js way
      isGlobal: true, // 모든 경로에서 접근 가능하게
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",// dotenv 파일 경로
      ignoreEnvFile: process.env.NODE_ENV === "prod", // 배포할 때
      validationSchema: Joi.object({ // .env 타입체킹
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        // 토큰을 지정하기 위해 사용하는 프라이빗 키
        PRIVATE_KEY: Joi.string().required()
      })
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true // 그래프큐엘 스키마 파일 저장경로 (true일 시 따로 생성되지 않는 듯 함)
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== "prod",
      logging: process.env.NODE_ENV !== "prod",
      entities: [User]
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
