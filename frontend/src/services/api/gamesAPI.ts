import type { GameRoom } from "../../types";
import { mockDelay } from "./helpers";
import { mockRooms } from "./mockData";

export const gamesAPI = {
  async getRooms(filters?: { privateOnly?: boolean; minBet?: number }) {
    await mockDelay();
    return mockRooms.filter((r) => {
      if (filters?.privateOnly && !r.isPrivate) return false;
      if (filters?.minBet && r.minBet < filters.minBet) return false;
      return true;
    });
  },
  async createRoom(room: Omit<GameRoom, "id" | "playersCount">) {
    await mockDelay();
    return { ...room, id: `room-${Date.now()}`, playersCount: 1 };
  },
  async joinRoom(roomId: string, stake: number) {
    await mockDelay();
    return { ok: true, roomId, stake };
  },
};
