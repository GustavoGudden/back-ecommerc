// Client
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAll() {
    try {
     return this.prismaClient.user.findMany()
    } catch (error) {
    throw error
    }
  }

  async findUserByEmail(email:string){
      return this.prismaClient.user.findFirst({where:{
        email
      }})
  }
 
  async create(createdUserDto:CreateUserDto):Promise<User> {
    try {
     return this.prismaClient.user.create({
      data:createdUserDto
     })
    }catch(error){
      throw error
    }

  }
}
