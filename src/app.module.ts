import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
        user: configService.get("MONGODB_USER"),
        pass: configService.get("MONGODB_PASS"),
        dbName: configService.get<string>("MONGODB_DBNAME")
      }),
      inject: [ConfigService]
    }),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
