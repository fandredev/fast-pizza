import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { Cart } from "./Cart";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

interface CardItemProps {
  item: Cart;
}

export default function CartItem({ item }: CardItemProps) {
  const { name, quantity, totalPrice, pizzaId } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-bold text-sm">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          currentPizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
