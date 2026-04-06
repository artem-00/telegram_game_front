import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAppStore } from "../store/appStore";
import s from "../styles/page.module.css";

export function ReferralsPage() {
  const { state, dispatch } = useAppStore();

  return (
    <div className={s.grid}>
      <Card>
        <h2>Реферальная система</h2>
        <div className={s.row}>
          <small>{state.referrals.link}</small>
          <Button onClick={() => navigator.clipboard.writeText(state.referrals.link)}>Копировать</Button>
        </div>
      </Card>
      <Card>
        <p>Всего: {state.referrals.total}</p>
        <p>Активных: {state.referrals.active}</p>
        <p>Заработано: {state.referrals.earned}</p>
      </Card>
      <Card>
        <h3>Список рефералов</h3>
        {state.referrals.items.map((r) => (
          <div key={r.id} className={s.row}>
            <span>{r.nickname}</span>
            <span>{r.earned}</span>
            <Button variant="secondary" onClick={() => dispatch({ type: "ADD_NOTIFICATION", payload: { type: "success", message: `Повышенный процент: ${r.nickname}` } })}>
              Выбрать
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
