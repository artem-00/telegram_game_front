export type Currency = "credits" | "bonus";

export interface User {
  id: string;
  nickname: string;
  avatarSeed: string;
  balances: Record<Currency, number>;
  totalGames: number;
  wins: number;
  losses: number;
}

export interface GameRoom {
  id: string;
  title: string;
  gameType: "roulette";
  minBet: number;
  maxBet: number;
  playersCount: number;
  maxPlayers: number;
  isPrivate: boolean;
}

export interface DailyTask {
  id: string;
  title: string;
  progress: number;
  target: number;
  reward: number;
  claimed: boolean;
}

export interface BonusesState {
  adventDays: number;
  unlockedDays: number;
  dailyBonusAvailable: boolean;
  tasks: DailyTask[];
  achievements: string[];
}

export interface Referral {
  id: string;
  nickname: string;
  active: boolean;
  earned: number;
}

export interface ReferralsState {
  link: string;
  total: number;
  active: number;
  earned: number;
  boostedReferralId?: string;
  items: Referral[];
}
