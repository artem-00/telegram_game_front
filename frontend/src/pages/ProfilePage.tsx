import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { RobotAvatar } from "../components/ui/RobotAvatar";
import { BalanceDisplay } from "../components/ui/BalanceDisplay";
import { useAppStore } from "../store/appStore";
import s from "../styles/page.module.css";

export function ProfilePage() {
  const { state } = useAppStore();
  const winRate = ((state.user.wins / Math.max(1, state.user.totalGames)) * 100).toFixed(1);

  return (
    <div className={s.grid}>
      <Card>
        <div className={s.row}>
          <RobotAvatar seed={state.user.avatarSeed} size={74} />
          <div>
            <h2>{state.user.nickname}</h2>
            <Button variant="secondary">Редактировать профиль</Button>
          </div>
        </div>
      </Card>
      <Card>
        <p>Всего игр: {state.user.totalGames}</p>
        <p>Побед/Поражений: {state.user.wins}/{state.user.losses}</p>
        <p>Win rate: {winRate}%</p>
      </Card>
      <Card>
        <div className={s.row}>
          <BalanceDisplay amount={state.user.balances.credits} label="CR" />
          <BalanceDisplay amount={state.user.balances.bonus} label="BONUS" />
        </div>
      </Card>
    </div>
  );
}
