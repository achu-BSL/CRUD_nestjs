import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    findUsers () {
        return this.usersService.findUsers();
    }

    @Get(':id')
    findOneUser (@Param('id') id: string) {
        return this.usersService.findOneUser(id);
    }

    @Post('')
    createUser (@Body() createUserDto: CreateUserDto) {
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