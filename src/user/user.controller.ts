import { CreateUserDto } from "./dtos/create-user.dto";
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

  handleCreateUser = async (req:Request,res:Response) =>{
    const createUserDto:CreateUserDto = req.body 
    const createdUser = await this.userService.createUser(createUserDto)
    res.json ({
     user:createdUser
    }
  ).status(201)
  }

}
