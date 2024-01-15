import { CartService } from "./cart.service";

// Types from express you do need to use the rigth type to overload function params work
import { Request, Response } from 'express';

export class  CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  handleCartById = async (req: Request, res: Response) =>{
    const { userID } = req.body;
    const product  = await this.cartService.getCartById(userID)

    return  res.json(product)
  }

}
