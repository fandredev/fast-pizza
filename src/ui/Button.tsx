import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonSize = "small" | "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
  disabled?: boolean;
  size?: ButtonSize;
}

export default function Button({
  children,
  to,
  disabled,
  size = "primary",
  ...rest
}: ButtonProps) {
  const base =
    "text-stone inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} px-2 py-1 md:px-3 md:py-2 text-sm`,
    secondary: `border-3 border-stone-300 transparent px-4 py-3 md:px-6 md:py-4 uppercase`,
  };

  if (to)
    return (
      <Link to={to} className={styles[size]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} {...rest} className={styles[size]}>
      {children}
    </button>
  );
}
