import { BadGatewayException, Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { LogginInterceptor } from "src/interceptors/logging.interceptor";
import { FreezePipe } from "src/pipes/freeze.pipe";
import { HttpExceptionFilter } from "src/filters/http-exception";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    // @UseGuards(AuthGuard)
    // @UseInterceptors(LogginInterceptor)
    // @UseFilters(HttpExceptionFilter)
    @Get()
    findUsers () {
        return this.usersService.findUsers();
    }

    @Get(':id')
    findOneUser (@Param('id') id: string) {
        return this.usersService.findOneUser(id);
    }

    @Post('')
    // @UseGuards(FreezePipe) //? this will apply to all the argurments.
    createUser (@Body(new FreezePipe<CreateUserDto>()) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser (@Param('id') id: string) {
        return  this.usersService.deleteUser(id);
    }

}