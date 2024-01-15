import { Express, Router } from 'express';

// Controller
import { CartController } from './cart.controller';

export class CartRouter {
  private cartouter = Router();

  constructor(private readonly expressApp: Express, private readonly cartController: CartController) {}

  async execute() {

    // Rotas
    this.cartouter.get('/',this.cartController.handleCartById)


    this.expressApp.use('/cart', this.cartouter);
  }
}
