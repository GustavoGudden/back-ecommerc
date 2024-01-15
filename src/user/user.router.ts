import { Express, Router } from 'express';

// Controller
import { UserController } from './user.controller';

export class UserRouter {
  private userRouter = Router();

  constructor(private readonly expressApp: Express, private readonly userController: UserController) {}

  async execute() {

    // Rotas
    this.userRouter.get('/',this.userController.handleGetAllUser)


    this.expressApp.use('/user', this.userRouter);
  }
}
