import { Express, Router } from 'express';
// Controller
import { ProductController } from './product.controller';



export class ProductRouter {
  private productRouter = Router();

  constructor(private readonly expressApp: Express, private readonly productController: ProductController) {}

  async execute() {

    // Rotas
    this.productRouter.get('/',this.productController.handleGetAllProducts)

    this.expressApp.use('/product', this.productRouter);
  }
}
