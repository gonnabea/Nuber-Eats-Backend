import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ // .env 설정 for nest.js way
      isGlobal: true, // 모든 경로에서 접근 가능하게
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",// dotenv 파일 경로
      ignoreEnvFile: process.env.NODE_ENV === "prod" // 배포할 때
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
      synchronize: true,
      logging: true,
    }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
