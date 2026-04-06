/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { BonusesState, GameRoom, ReferralsState, User } from "../types";
import { mockBonuses, mockRooms, mockUser, mockReferrals } from "../services/api/mockData";

interface UiState {
  loading: boolean;
  createRoomOpen: boolean;
  joinRoomId?: string;
  notifications: { id: string; type: "success" | "error"; message: string }[];
}

interface AppState {
  user: User;
  games: GameRoom[];
  bonuses: BonusesState;
  referrals: ReferralsState;
  ui: UiState;
}

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User }
  | { type: "OPEN_CREATE_ROOM"; payload: boolean }
  | { type: "OPEN_JOIN_ROOM"; payload?: string }
  | { type: "ADD_NOTIFICATION"; payload: { type: "success" | "error"; message: string } }
  | { type: "DISMISS_NOTIFICATION"; payload: string };

const initialState: AppState = {
  user: mockUser,
  games: mockRooms,
  bonuses: mockBonuses,
  referrals: mockReferrals,
  ui: {
    loading: false,
    createRoomOpen: false,
    notifications: [],
  },
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, ui: { ...state.ui, loading: action.payload } };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "OPEN_CREATE_ROOM":
      return { ...state, ui: { ...state.ui, createRoomOpen: action.payload } };
    case "OPEN_JOIN_ROOM":
      return { ...state, ui: { ...state.ui, joinRoomId: action.payload } };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [
            ...state.ui.notifications,
            { id: crypto.randomUUID(), ...action.payload },
          ],
        },
      };
    case "DISMISS_NOTIFICATION":
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter((n) => n.id !== action.payload),
        },
      };
    default:
      return state;
  }
}

interface AppStoreValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used inside AppStoreProvider");
  }
  return context;
}
