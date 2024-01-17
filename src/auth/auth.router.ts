import { Express, Router } from 'express';

// Controller
import { AuthController } from './auth.controller';

export class AuthRouter {
  private authrouter = Router();

  constructor(private readonly expressApp: Express, private readonly authontroller: AuthController) {}

  async execute() {

    // Rotas
    this.authrouter.get('/sing-in',this.authontroller.handleSignIn)

    this.authrouter.get('/checkHmac',this.authontroller.handleCheckIntegrity)

    this.authrouter.post('/loginHmac',this.authontroller.handleGenerateHmacSignature)

    this.expressApp.use('/auth', this.authrouter);
  }
}
