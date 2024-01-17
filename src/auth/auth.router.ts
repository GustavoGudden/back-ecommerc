import { Express, Router } from 'express';

// Controller
import { AuthController } from './auth.controller';
import { HmacMiddleware } from '../common/middleware/hmac.middleware';

export class AuthRouter {
  private authrouter = Router();

  constructor(
    private readonly expressApp: Express,
    private readonly authontroller: AuthController,
    private readonly hmacMiddleware: HmacMiddleware
  ) {}

  async execute() {
    // Rotas
    this.authrouter.get('/sing-in', this.hmacMiddleware.validate, this.authontroller.handleSignIn);

    this.expressApp.use('/auth', this.authrouter);
  }
}
