import { Express } from 'express';
import { PrismaClient } from '@prisma/client';

// Router
import { UserRouter } from './user.router';

// Controller
import { UserController } from './user.controller';

// Service
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { HashUtil } from '../common/utils/hash.util';
import { UserMiddleware } from './middlewares/create-user.middleware';
import { HmacStrategy } from '../common/strategies/hmac.strategy';
import { HmacMiddleware } from '../common/middleware/hmac.middleware';

// Util

export class UserModule {
  constructor(private readonly prismaClient: PrismaClient) {}

  start(app: Express) {
    const hmacStrategy = new HmacStrategy();
    const hmacMiddleware = new HmacMiddleware(hmacStrategy);

    const hashUtil = new HashUtil();
    const userMiddleware = new UserMiddleware(hashUtil);

    const userRespository = new UserRepository(this.prismaClient);

    const userService = new UserService(userRespository);

    const userController = new UserController(userService);

    const userRouter = new UserRouter(app, userController, userMiddleware, hmacMiddleware);

    userRouter.execute();
  }
}
