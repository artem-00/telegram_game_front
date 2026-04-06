import s from "../../styles/ui.module.css";

export function BalanceDisplay({ amount, label = "CR" }: { amount: number; label?: string }) {
  return (
    <div className={s.badge}>
      <span>💠</span>
      <strong>{amount.toLocaleString()}</strong>
      <small>{label}</small>
    </div>
  );
}
