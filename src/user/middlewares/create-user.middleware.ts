import { Request, Response, NextFunction } from 'express';
import { HashUtil } from '../../common/utils/hash.util';


export class UserMiddleware {
    constructor(
        private readonly hashUtil:HashUtil
    ){}

 createUserMiddleware = async (req:Request,res:Response,next:NextFunction)  => {
     const createUserDto = req.body  
     const hashedPassword = await this.hashUtil.encryptWithRandomSalt(createUserDto.password)
  
     req.body = {
        ...req.body,
        password: hashedPassword
     }
    next()
  }

}