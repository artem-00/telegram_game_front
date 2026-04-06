import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAppStore } from "../store/appStore";
import s from "../styles/page.module.css";

export function BonusesPage() {
  const { state, dispatch } = useAppStore();
  return (
    <div className={s.grid}>
      <Card>
        <h2>Адвент-календарь ({state.bonuses.adventDays} дней)</h2>
        <div className={s.gameGrid}>
          {Array.from({ length: state.bonuses.adventDays }).map((_, i) => (
            <div key={i} className={s.muted}>
              День {i + 1} {i < state.bonuses.unlockedDays ? "✅" : "🔒"}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3>Ежедневные задания</h3>
        <div className={s.grid}>
          {state.bonuses.tasks.map((task) => (
            <div key={task.id}>
              <div className={s.row}>
                <span>{task.title}</span>
                <small>{task.progress}/{task.target}</small>
              </div>
              <div className={s.progress}><span style={{ width: `${(task.progress / task.target) * 100}%` }} /></div>
              <div className={s.row}>
                <small>Награда: {task.reward}</small>
                <Button onClick={() => dispatch({ type: "ADD_NOTIFICATION", payload: { type: "success", message: "Награда добавлена." } })}>Забрать награду</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3>Достижения</h3>
        {state.bonuses.achievements.map((a) => <p key={a}>{a}</p>)}
      </Card>
    </div>
  );
}
