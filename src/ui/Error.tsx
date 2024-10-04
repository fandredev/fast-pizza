import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

interface ErrorData {
  data: string;
  error: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}

export default function Error() {
  const error = useRouteError() as ErrorData;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}
