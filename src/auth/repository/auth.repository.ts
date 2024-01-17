// Client
import { PrismaClient, User } from '@prisma/client';

export class AuthRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getIdByUserName(userName:string) {
    try {
     return await this.prismaClient.user.findFirst({
      where:{name:userName}
     });
    } catch (error) {
    throw error
    }
  }
  
 


}
