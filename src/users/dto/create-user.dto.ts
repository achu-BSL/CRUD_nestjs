import { IsEmail, Max, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @Min(0)
    @Max(100)
    age: number;
} 