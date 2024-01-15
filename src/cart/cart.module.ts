import { Express } from 'express';
import { PrismaClient } from '@prisma/client';

// Router
import { CartRouter } from './cart.router';

// Controller
import {  CartController } from './cart.controller';

// Service
import { CartService } from './cart.service';
import {  CartRepository } from './repository/cart.repository';



export class CartModule {
 
  constructor(private readonly prismaClient:PrismaClient ) {}

  start(app: Express) {

    const cartRespository = new CartRepository(this.prismaClient)

    const cartService = new  CartService(cartRespository)

    const cartController = new CartController(cartService)

    const  cartRouter = new CartRouter(app, cartController);

    cartRouter.execute();
  }
}
