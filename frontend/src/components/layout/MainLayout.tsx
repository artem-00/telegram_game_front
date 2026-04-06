import type { ReactNode } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import s from "../../styles/layout.module.css";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.shell}>
      <Header />
      <main className={s.main}>{children}</main>
      <NavBar />
    </div>
  );
}
