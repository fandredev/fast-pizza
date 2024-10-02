import { useNavigate, useRouteError } from "react-router-dom";

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
  const navigate = useNavigate();
  const error = useRouteError() as ErrorData;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}
