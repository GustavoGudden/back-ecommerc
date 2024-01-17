import { Express } from 'express';
import { PrismaClient } from '@prisma/client';

// Router
import { AuthRouter } from './auth.router';

// Controller
import { AuthController } from './auth.controller';

// Service
import { AuthService } from './auth.service';

// Respository
import { AuthRepository } from './repository/auth.repository';
import { HashUtil } from '../common/utils/hash.util';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HmacMiddleware } from '../common/middleware/hmac.middleware';
import { HmacStrategy } from '../common/strategies/hmac.strategy';

export class AuthModule {
  constructor(private readonly prismaClient: PrismaClient) {}

  start(app: Express) {
    const authRespository = new AuthRepository(this.prismaClient);

    const hmacStrategy = new HmacStrategy();
    const hmacMiddleware = new HmacMiddleware(hmacStrategy);

    const hashUtil = new HashUtil();
    const jwtStrategy = new JwtStrategy();
    const authService = new AuthService(authRespository, hashUtil, jwtStrategy);

    const authController = new AuthController(authService);

    const authRouter = new AuthRouter(app, authController, hmacMiddleware);

    authRouter.execute();
  }
}
