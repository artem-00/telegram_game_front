import { Link } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { BalanceDisplay } from "../ui/BalanceDisplay";
import { RobotAvatar } from "../ui/RobotAvatar";
import s from "../../styles/layout.module.css";

export function Header() {
  const { state } = useAppStore();
  return (
    <header className={s.header}>
      <BalanceDisplay amount={state.user.balances.credits} />
      <Link to="/profile">
        <RobotAvatar seed={state.user.avatarSeed} />
      </Link>
    </header>
  );
}
