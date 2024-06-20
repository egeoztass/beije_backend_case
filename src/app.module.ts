import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import { UserModule } from "./user/user.module";

dotenv.config({ path: ".env.local" });

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UserModule],
})
export class AppModule {}
