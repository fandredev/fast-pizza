import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LinkButtonProps {
  children: ReactNode;
  to: string;
}

export default function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();
  const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1") {
    return <button onClick={() => navigate(-1)}></button>;
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
