import { Link } from "react-router-dom";

export interface Cart {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const fakeCart: Cart[] = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export default function Cart() {
  const cart = fakeCart;
  console.log(cart);

  return (
    <div>
      <Link to="/menu">&larr; Back to menu</Link>

      <h2>Your cart, %NAME%</h2>

      <div>
        <Link to="/order/new">Order pizzas</Link>
        <button>Clear cart</button>
      </div>
    </div>
  );
}
