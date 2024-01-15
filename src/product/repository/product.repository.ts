// Client
import { PrismaClient } from '@prisma/client';

export class ProductRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAll() {
    try {
   return this.prismaClient.product.findMany()
    } catch (error) {
    throw error
    }
  }


}
