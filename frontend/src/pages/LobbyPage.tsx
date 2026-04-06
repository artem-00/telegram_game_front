import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { GameRoomCard } from "../components/game/GameRoomCard";
import s from "../styles/page.module.css";

export function LobbyPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppStore();

  return (
    <div className={s.grid}>
      <Card>
        <h2>Привет, {state.user.nickname}</h2>
        <p className={s.muted}>Баланс: {state.user.balances.credits.toLocaleString()} CR</p>
      </Card>
      <div className={s.gameGrid}>
        {["PvP Рулетка", "Режим 2", "Режим 3", "Режим 4"].map((name, i) => (
          <Card key={name}>
            <div className={s.grid}>
              <strong>{name}</strong>
              <Button onClick={() => i === 0 && navigate("/games/roulette")}>Открыть</Button>
            </div>
          </Card>
        ))}
      </div>
      <div className={s.row}>
        <Button onClick={() => dispatch({ type: "OPEN_CREATE_ROOM", payload: true })}>Создать комнату</Button>
        <Button variant="secondary" onClick={() => dispatch({ type: "OPEN_JOIN_ROOM", payload: state.games[0]?.id })}>Быстрый старт</Button>
      </div>
      {state.bonuses.dailyBonusAvailable && <Card>Доступен ежедневный бонус</Card>}
      {state.games.map((room) => (
        <GameRoomCard key={room.id} room={room} onJoin={(id) => dispatch({ type: "OPEN_JOIN_ROOM", payload: id })} />
      ))}
    </div>
  );
}
