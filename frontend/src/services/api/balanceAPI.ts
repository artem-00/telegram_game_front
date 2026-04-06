import { mockDelay } from "./helpers";
import { mockUser } from "./mockData";

export const balanceAPI = {
  async getBalance() {
    await mockDelay();
    return mockUser.balances;
  },
  async getTransactions() {
    await mockDelay();
    return [
      { id: "tx-1", amount: 300, type: "win" },
      { id: "tx-2", amount: -120, type: "bet" },
    ];
  },
};
