import { Express } from 'express';
import { PrismaClient } from '@prisma/client';

// Router
import { UserRouter } from './user.router';

// Controller
import {  UserController } from './user.controller';

// Service
import { UserService } from './user.service';
import {  UserRepository } from './repository/user.repository';



export class UserModule {
 
  constructor(private readonly prismaClient:PrismaClient ) {}

  start(app: Express) {

    const userRespository = new UserRepository(this.prismaClient)

    const userService = new  UserService(userRespository)

    const userController = new UserController(userService)

    const  userRouter = new UserRouter(app, userController);

    userRouter.execute();
  }
}
