import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

interface DeleteItemProps {
  pizzaId: number;
}

export default function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button size="small" onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}
