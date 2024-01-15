import { ProductRepository } from "./repository/product.repository";

export class ProductService {
  constructor( private readonly productRepository:ProductRepository) {}

  async getAllProducts() {
    return this.productRepository.getAll();
  }
}
