// Client
import { PrismaClient } from '@prisma/client';

export class CartRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findManyById(userID:number) {
    try {
     return await this.prismaClient.cart.findMany({
        where: {
          userId: userID,
        },
      });
    } catch (error) {
    throw error
    }
  }

}
