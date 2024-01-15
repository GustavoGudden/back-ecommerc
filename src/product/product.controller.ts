import { ProductService } from "./product.service";

// Types from express you do need to use the rigth type to overload function params work
import { Request, Response } from 'express';

export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}



  handleGetAllProducts = async (req: Request, res: Response) =>{
    const products  = await this.productService.getAllProducts()
    
    return  res.json(products)
  }

}
