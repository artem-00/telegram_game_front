import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAppStore } from "../store/appStore";
import { GameRoomCard } from "../components/game/GameRoomCard";
import s from "../styles/page.module.css";

export function RoulettePage() {
  const { state, dispatch } = useAppStore();

  return (
    <div className={s.grid}>
      <Card>
        <h2>PvP Рулетка</h2>
        <div className={s.row}>
          <select className={s.select}><option>Общие</option><option>Приватные</option></select>
          <input className={s.input} placeholder="Фильтр по ставке" />
        </div>
        <Button onClick={() => dispatch({ type: "OPEN_CREATE_ROOM", payload: true })}>Создать свою комнату</Button>
      </Card>
      {state.games.map((room) => (
        <GameRoomCard key={room.id} room={room} onJoin={(id) => dispatch({ type: "OPEN_JOIN_ROOM", payload: id })} />
      ))}
    </div>
  );
}
