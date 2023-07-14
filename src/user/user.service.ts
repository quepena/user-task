import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find({});
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id: id })
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }

    async updateUser(id: number, userDetails: CreateUserDto): Promise<User> {
        const { username, email, photo, password } = userDetails;
        const user = new User();
        user.username = username;
        user.email = email;
        user.photo = photo;
        user.password = password;

        const updatedUser = await this.userRepository.save({ id: Number(id), username: user.username, email: user.email, photo: user.photo, password: user.password });

        return updatedUser;
    }
}
