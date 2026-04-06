import { NavLink } from "react-router-dom";
import s from "../../styles/layout.module.css";

const items = [
  { to: "/", label: "Главная" },
  { to: "/bonuses", label: "Бонусы" },
  { to: "/leaders", label: "Лидеры" },
  { to: "/referrals", label: "Рефералы" },
  { to: "/profile", label: "Профиль" },
];

export function NavBar() {
  return (
    <nav className={s.nav}>
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end className={({ isActive }) => `${s.navItem} ${isActive ? s.active : ""}`}>
          {i.label}
        </NavLink>
      ))}
    </nav>
  );
}
