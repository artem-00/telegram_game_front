import { mockDelay } from "./helpers";
import { mockReferrals } from "./mockData";

export const referralsAPI = {
  async getReferrals() {
    await mockDelay();
    return mockReferrals;
  },
  async setBoostedReferral(referralId: string) {
    await mockDelay();
    return { ok: true, referralId };
  },
};
