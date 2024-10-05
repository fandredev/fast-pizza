import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

export default function CartOverview() {
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalCardQuantity = useSelector(getTotalCartQuantity);

  if (!totalCardQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-sm text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold uppercase text-stone-200 sm:space-x-6">
        <span>{totalCardQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
