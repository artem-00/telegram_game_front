import type { ReactNode } from "react";
import s from "../../styles/ui.module.css";

export function Card({ children }: { children: ReactNode }) {
  return <section className={s.card}>{children}</section>;
}
