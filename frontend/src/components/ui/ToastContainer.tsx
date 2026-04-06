import { useEffect } from "react";
import { useAppStore } from "../../store/appStore";
import s from "../../styles/ui.module.css";

export function ToastContainer() {
  const { state, dispatch } = useAppStore();

  useEffect(() => {
    const id = state.ui.notifications[0]?.id;
    if (!id) return;
    const t = setTimeout(() => dispatch({ type: "DISMISS_NOTIFICATION", payload: id }), 2500);
    return () => clearTimeout(t);
  }, [dispatch, state.ui.notifications]);

  return (
    <div className={s.toasts}>
      {state.ui.notifications.map((n) => (
        <div key={n.id} className={`${s.toast} ${n.type === "success" ? s.success : s.error}`}>
          {n.message}
        </div>
      ))}
    </div>
  );
}
