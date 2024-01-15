import { UserService } from "./user.service";

// Types from express you do need to use the rigth type to overload function params work
import { Request, Response } from 'express';

export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}



  handleGetAllUser = async (req: Request, res: Response) =>{
    const users  = await this.userService.getAllUsers()
  
    return  res.json(users)
  }

}
