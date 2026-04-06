import s from "../../styles/ui.module.css";

export function LoadingSpinner() {
  return (
    <div className={s.spinner}>
      <div className={s.spinnerDot} />
    </div>
  );
}
