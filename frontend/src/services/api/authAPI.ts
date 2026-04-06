import { apiRequest } from "./client";
import { mapPlayerToUser, type PlayerApiDto } from "./mappers";

export const authAPI = {
  async loginWithTelegram(initData: string) {
    const data = await apiRequest<{ access: string; player: PlayerApiDto }>("/telegram/login/", {
      method: "POST",
      body: { init_data: initData },
    });
    return { token: data.access, user: mapPlayerToUser(data.player) };
  },
  async loginByAccess(access: string) {
    const player = await apiRequest<PlayerApiDto>("/jwt/me/", {
      method: "POST",
      body: { access },
    });
    return mapPlayerToUser(player);
  },
};
