import { formatCurrency } from "../../utils/helpers";
import { Cart } from "./Cart";

interface CardItemProps {
  item: Cart;
}

export default function CartItem({ item }: CardItemProps) {
  const { name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
