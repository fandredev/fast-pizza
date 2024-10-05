import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { RootState } from "../store";
import Button from "./Button";

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 px-4 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" size="primary">
          Continue ordering, {username}!
        </Button>
      )}
    </div>
  );
}
