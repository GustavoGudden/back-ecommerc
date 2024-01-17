import { Express, Router } from 'express';

// Controller
import { UserController } from './user.controller';
import { UserMiddleware } from './middlewares/create-user.middleware';
import { HmacMiddleware } from '../common/middleware/hmac.middleware';

export class UserRouter {
  private userRouter = Router();

  constructor(
    private readonly expressApp: Express,
    private readonly userController: UserController,
    private readonly userMiddleware: UserMiddleware,
    private readonly hmacMiddleware: HmacMiddleware
  ) {}

  async execute() {
    this.userRouter.get('/', this.hmacMiddleware.validate, this.userController.handleGetAllUser);
    this.userRouter.post('/', this.userMiddleware.createUserMiddleware, this.userController.handleCreateUser);

    this.expressApp.use('/user', this.userRouter);
  }
}
