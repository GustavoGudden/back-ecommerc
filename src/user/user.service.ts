import { CreateUserDto } from "./dtos/create-user.dto";
import {  UserRepository } from "./repository/user.repository";

export class UserService {
  constructor( private readonly userRepository:UserRepository) {}

  async getAllUsers() {
    return this.userRepository.getAll();
  }

  async createUser(createUserDto:CreateUserDto) {
    const isUserAlreadyRegister  = await  this.checkUserAlreadyRegister(createUserDto)

       if(!isUserAlreadyRegister){
           const createdUser  = await this.userRepository.create(createUserDto)   
           return createdUser 
       }
  }


private async checkUserAlreadyRegister(createUserDto:CreateUserDto):Promise<boolean> {
  const user  =  await this.userRepository.findUserByEmail(createUserDto.email);
   return user ?  true : false  
}
}
