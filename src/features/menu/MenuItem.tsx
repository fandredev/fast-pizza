import { GetMenuPizzas } from "../../services/interfaces/restaurant";
import { formatCurrency } from "../../utils/helpers";

interface MenuItemProps {
  pizza: GetMenuPizzas;
}

export default function MenuItem({ pizza }: MenuItemProps) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(", ")}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}
