import { formatCurrency } from "../../utils/helpers";

interface OrderItemProps {
  item: {
    quantity: number;
    name: string;
    totalPrice: number;
  };
}

export default function OrderItem({ item }: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
