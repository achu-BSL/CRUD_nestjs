import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./schemas/user.shema";


@Module({
    imports: [MongooseModule.forFeature([{name: 'users', schema: userSchema}])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}