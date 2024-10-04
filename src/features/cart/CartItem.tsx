import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { Cart } from "./Cart";

interface CardItemProps {
  item: Cart;
}

export default function CartItem({ item }: CardItemProps) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-bold text-sm">{formatCurrency(totalPrice)}</p>
        <Button size="small">Delete</Button>
      </div>
    </li>
  );
}
