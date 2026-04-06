import type { User } from "../../types";

export interface PlayerApiDto {
  id: number;
  name: string;
  coins: number;
  money: number;
  created_at: string;
  updated_at: string;
}

export function mapPlayerToUser(player: PlayerApiDto): User {
  return {
    id: String(player.id),
    nickname: player.name,
    avatarSeed: `robot-${player.id}`,
    balances: {
      credits: player.coins ?? 0,
      bonus: player.money ?? 0,
    },
    totalGames: 0,
    wins: 0,
    losses: 0,
  };
}
