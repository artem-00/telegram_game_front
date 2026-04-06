import type { ReactNode } from "react";
import s from "../../styles/ui.module.css";

export function Modal({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>{children}</div>
    </div>
  );
}
