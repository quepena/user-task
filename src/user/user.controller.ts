import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.userService.findUserById(id)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

    @Put(':id')
    async updateRole(@Param('id') id: number, @Body() user: CreateUserDto) {
        return this.userService.updateUser(id, user);
    }
}
