import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel('users') private readonly userModel: Model<User>){}

    //* GET /users
    /**
     * Retrieve all users.
     * @returns {User[]} - Users details.
     */
    async findUsers (): Promise<User[]> {
        return await this.userModel.find();
    }

    //*GET /users/:id
    /**
     * Find specific user by ID.
     * 
     * @param id - The user id for retrieve user data.
     * @returns - User details from database.
     * @throws {NotFoundException} - If the user with the give ID is not found.
     */
    async findOneUser (id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if(!user) throw new NotFoundException();
        return user;
    }

    //*POST /users
    /**
     * Create new user.
     * 
     * @param createUserDto - User details.
     * @returns - User data from database.
     */
    async createUser (createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto);
        return user;
    }

    //*PUT /users/:id
    /**
     * Update user details by ID.
     * 
     * @param id - The ID of the user to find specific user.
     * @param updateUserDto - Updated user details for update.
     * @returns {User} - Update user data.
     * @throws {NotFoundException} - If the user with the give ID is not found.
     */
    async updateUser (id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, {$set: updateUserDto}, {returnOriginal: false});
        if(!user) throw new NotFoundException();
        return user;
    }

    //*DELETE /users/:id
    /**
     * Delete a specific user by ID.
     * 
     * @param {string} id - The ID of the user to delete. 
     * @returns {User} - Deleted user data.
     * @throws {NotFoundException} - If the user with the give ID is not found.
     */
    async deleteUser (id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id);
        if(!user) throw new NotFoundException();
        return user;
    }
}