import type { BonusesState, GameRoom, ReferralsState, User } from "../../types";

export const mockUser: User = {
  id: "u1",
  nickname: "CyberPilot",
  avatarSeed: "robot-1",
  balances: { credits: 12500, bonus: 320 },
  totalGames: 152,
  wins: 93,
  losses: 59,
};

export const mockRooms: GameRoom[] = [
  { id: "r1", title: "Neon Rush", gameType: "roulette", minBet: 100, maxBet: 600, playersCount: 2, maxPlayers: 4, isPrivate: false },
  { id: "r2", title: "Steel Arena", gameType: "roulette", minBet: 500, maxBet: 1500, playersCount: 3, maxPlayers: 6, isPrivate: false },
  { id: "r3", title: "Quantum Private", gameType: "roulette", minBet: 700, maxBet: 2000, playersCount: 1, maxPlayers: 4, isPrivate: true },
];

export const mockBonuses: BonusesState = {
  adventDays: 14,
  unlockedDays: 5,
  dailyBonusAvailable: true,
  tasks: [
    { id: "t1", title: "Сыграть 3 матча", progress: 1, target: 3, reward: 80, claimed: false },
    { id: "t2", title: "Выиграть 1 матч", progress: 1, target: 1, reward: 120, claimed: false },
  ],
  achievements: ["Первые шаги", "Победа без поражений"],
};

export const mockReferrals: ReferralsState = {
  link: "https://t.me/your_bot?start=ref_u1",
  total: 12,
  active: 7,
  earned: 3480,
  boostedReferralId: "ref2",
  items: [
    { id: "ref1", nickname: "NeoBolt", active: true, earned: 550 },
    { id: "ref2", nickname: "IronFox", active: true, earned: 1200 },
    { id: "ref3", nickname: "NightCore", active: false, earned: 220 },
  ],
};
