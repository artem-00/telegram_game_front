import { mockDelay } from "./helpers";
import { mockBonuses } from "./mockData";

export const bonusesAPI = {
  async getBonuses() {
    await mockDelay();
    return mockBonuses;
  },
  async claimDailyBonus() {
    await mockDelay();
    return { amount: 100, type: "credits" };
  },
  async claimTask(taskId: string) {
    await mockDelay();
    return { ok: true, taskId };
  },
};
