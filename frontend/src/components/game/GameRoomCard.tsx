import type { GameRoom } from "../../types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import s from "../../styles/page.module.css";

export function GameRoomCard({ room, onJoin }: { room: GameRoom; onJoin: (id: string) => void }) {
  return (
    <Card>
      <div className={s.grid}>
        <strong>{room.title}</strong>
        <div className={s.row}>
          <small>Ставка {room.minBet}-{room.maxBet}</small>
          <small>
            {room.playersCount}/{room.maxPlayers}
          </small>
        </div>
        <Button onClick={() => onJoin(room.id)}>Присоединиться</Button>
      </div>
    </Card>
  );
}
