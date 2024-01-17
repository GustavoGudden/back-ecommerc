import { Express, Router } from 'express';

// Controller
import { UserController } from './user.controller';
import { UserMiddleware } from './middlewares/create-user.middleware';

export class UserRouter {
  private userRouter = Router();

  constructor(private readonly expressApp: Express, private readonly userController: UserController,private readonly userMiddleware:UserMiddleware) {}


  async execute() {

    // Rotas
    this.userRouter.get('/',this.userController.handleGetAllUser)
    this.userRouter.post('/',this.userMiddleware.createUserMiddleware, this.userController.handleCreateUser)

    this.expressApp.use('/user', this.userRouter);
  }
}
