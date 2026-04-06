import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useAppStore } from "../../store/appStore";
import s from "../../styles/page.module.css";

export function CreateRoomModal() {
  const { state, dispatch } = useAppStore();
  const [minBet, setMinBet] = useState("100");
  const [maxBet, setMaxBet] = useState("1000");
  const [players, setPlayers] = useState("4");

  const close = () => dispatch({ type: "OPEN_CREATE_ROOM", payload: false });

  const onCreate = () => {
    if (Number(minBet) <= 0 || Number(maxBet) < Number(minBet)) {
      dispatch({ type: "ADD_NOTIFICATION", payload: { type: "error", message: "Проверь ставки." } });
      return;
    }
    dispatch({ type: "ADD_NOTIFICATION", payload: { type: "success", message: `Комната на ${players} игроков создана.` } });
    close();
  };

  return (
    <Modal open={state.ui.createRoomOpen}>
      <h3>Создание комнаты</h3>
      <div className={s.grid}>
        <select className={s.select} defaultValue="roulette">
          <option value="roulette">PvP Рулетка</option>
        </select>
        <input className={s.input} value={minBet} onChange={(e) => setMinBet(e.target.value)} placeholder="Min ставка" />
        <input className={s.input} value={maxBet} onChange={(e) => setMaxBet(e.target.value)} placeholder="Max ставка" />
        <input className={s.input} value={players} onChange={(e) => setPlayers(e.target.value)} placeholder="Игроков 2-8" />
        <select className={s.select}>
          <option>Публичная</option>
          <option>Приватная</option>
        </select>
        <div className={s.row}>
          <Button variant="secondary" onClick={close}>Отмена</Button>
          <Button onClick={onCreate}>Создать</Button>
        </div>
      </div>
    </Modal>
  );
}
