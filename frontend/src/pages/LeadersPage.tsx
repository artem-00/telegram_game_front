import { Card } from "../components/ui/Card";
import s from "../styles/page.module.css";

export function LeadersPage() {
  const leaders = [
    { nickname: "Nova", wins: 1200 },
    { nickname: "Artemis", wins: 998 },
    { nickname: "MechRider", wins: 880 },
  ];
  const fights = ["W vs Nova", "L vs DarkCore", "W vs IronFox"];

  return (
    <div className={s.grid}>
      <Card>
        <h2>Таблица лидеров</h2>
        {leaders.map((l, i) => (
          <div className={s.row} key={l.nickname}>
            <span>#{i + 1} {l.nickname}</span>
            <span>{l.wins}</span>
          </div>
        ))}
      </Card>
      <Card>
        <h3>История боев</h3>
        {fights.map((f) => <p key={f}>{f}</p>)}
      </Card>
    </div>
  );
}
