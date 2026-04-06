import type { User } from "../../types";
import { apiRequest } from "./client";
import { mapPlayerToUser, type PlayerApiDto } from "./mappers";

export const userAPI = {
  async getPlayerById(playerId: number | string): Promise<User> {
    const player = await apiRequest<PlayerApiDto>(`/players/${playerId}/`, {
      method: "GET",
    });
    return mapPlayerToUser(player);
  },
  async createPlayer(payload: { player_id: number; name: string }) {
    const player = await apiRequest<PlayerApiDto>("/players/", {
      method: "POST",
      body: payload,
    });
    return mapPlayerToUser(player);
  },
};
