import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { join } from "path";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true // 그래프큐엘 스키마 파일 저장경로 (true일 시 따로 생성되지 않는 듯 함)
    }),
    RestaurantsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
