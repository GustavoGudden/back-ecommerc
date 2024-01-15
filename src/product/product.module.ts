import { Express } from 'express';
import { PrismaClient } from '@prisma/client';

// Router
import { ProductRouter } from './product.router';

// Controller
import { ProductController } from './product.controller';

// Service
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product.repository';



export class ProductModule {
 
  constructor(private readonly prismaClient:PrismaClient ) {}

  start(app: Express) {

    const productRespository = new ProductRepository(this.prismaClient)

    const productService = new  ProductService(productRespository)

    const productController = new ProductController(productService)

    const  productRouter = new ProductRouter(app, productController);

    productRouter.execute();
  }
}
