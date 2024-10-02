import { Cart } from "../../features/cart/Cart";

export interface GetMenuPizzas {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}


export interface OrderProps {
  address: string;
  cart: Cart[];
  customer: string;
  phone: string;
  priority: boolean;
}