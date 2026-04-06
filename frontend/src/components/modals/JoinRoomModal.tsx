import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useAppStore } from "../../store/appStore";
import s from "../../styles/page.module.css";

export function JoinRoomModal() {
  const { state, dispatch } = useAppStore();
  const room = state.games.find((r) => r.id === state.ui.joinRoomId);

  const close = () => dispatch({ type: "OPEN_JOIN_ROOM", payload: undefined });
  if (!room) return null;

  return (
    <Modal open={Boolean(state.ui.joinRoomId)}>
      <h3>Присоединение к комнате</h3>
      <div className={s.grid}>
        <small>{room.title}</small>
        <small>Ставка: {room.minBet} - {room.maxBet}</small>
        <div className={s.row}>
          <Button variant="secondary" onClick={close}>Отмена</Button>
          <Button onClick={() => { dispatch({ type: "ADD_NOTIFICATION", payload: { type: "success", message: "Подключение к комнате..." } }); close(); }}>Играть</Button>
        </div>
      </div>
    </Modal>
  );
}
