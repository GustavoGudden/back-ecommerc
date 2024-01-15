import {  CartRepository} from "./repository/cart.repository";

export class CartService {
  constructor( private readonly cartRepository:CartRepository) {}

  async getCartById(userID:number) {
    return this.cartRepository.findManyById(userID);
  }
}
