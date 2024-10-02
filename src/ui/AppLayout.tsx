import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This is where the nested routes will be rendered */}
      </main>

      <CartOverview />
    </>
  );
}
