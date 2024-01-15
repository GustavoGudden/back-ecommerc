// Client
import { PrismaClient } from '@prisma/client';

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getAll() {
    try {
     return this.prismaClient.user.findMany()
    } catch (error) {
    throw error
    }
  }

}
