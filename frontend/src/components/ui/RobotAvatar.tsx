import s from "../../styles/ui.module.css";

export function RobotAvatar({ seed, size = 56 }: { seed: string; size?: number }) {
  return (
    <div className={s.robot} style={{ width: size, height: size }} title={seed}>
      🤖
    </div>
  );
}
