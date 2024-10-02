import { useLoaderData } from "react-router-dom";
import { GetMenuPizzas } from "../../services/interfaces/restaurant";
import MenuItem from "./MenuItem";

export default function Menu() {
  const menuData = useLoaderData() as GetMenuPizzas[];

  return (
    <ul>
      {menuData.map((item) => (
        <MenuItem pizza={item} key={item.id} />
      ))}
    </ul>
  );
}
