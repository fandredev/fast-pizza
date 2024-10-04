import { useLoaderData } from "react-router-dom";
import { GetMenuPizzas } from "../../services/interfaces/restaurant";
import MenuItem from "./MenuItem";

export default function Menu() {
  const menuData = useLoaderData() as GetMenuPizzas[];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menuData.map((item) => (
        <MenuItem pizza={item} key={item.id} />
      ))}
    </ul>
  );
}
