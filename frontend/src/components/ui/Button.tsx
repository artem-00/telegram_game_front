import type { ButtonHTMLAttributes } from "react";
import s from "../../styles/ui.module.css";

type Variant = "primary" | "secondary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", disabled, className = "", ...props }: Props) {
  const cls = [s.button, s[variant], disabled ? s.disabled : "", className].join(" ").trim();
  return <button disabled={disabled} className={cls} {...props} />;
}
