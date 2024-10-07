import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

interface UpdateItemQuantityProps {
  currentPizzaId: number;
  currentQuantity: number;
}

export default function UpdateItemQuantity({
  currentPizzaId,
  currentQuantity,
}: UpdateItemQuantityProps) {
  const dispatch = useDispatch();

  function handleIncreaseItem() {
    dispatch(increaseItemQuantity(currentPizzaId));
  }

  function handleDecreaseItem() {
    dispatch(decreaseItemQuantity(currentPizzaId));
  }

  return (
    <div className="flex items-center gap-3 md:gap-3">
      <Button size="round" onClick={handleDecreaseItem}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button size="round" onClick={handleIncreaseItem}>
        +
      </Button>
    </div>
  );
}
