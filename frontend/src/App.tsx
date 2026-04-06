import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppStoreProvider, useAppStore } from "./store/appStore";
import { applyTelegramTheme, getTelegramInitData, initTelegramWebApp, isTelegramWebApp, setupTelegramBackButton } from "./services/telegram/telegram";
import { MainLayout } from "./components/layout/MainLayout";
import { LobbyPage } from "./pages/LobbyPage";
import { ProfilePage } from "./pages/ProfilePage";
import { BonusesPage } from "./pages/BonusesPage";
import { LeadersPage } from "./pages/LeadersPage";
import { ReferralsPage } from "./pages/ReferralsPage";
import { RoulettePage } from "./pages/RoulettePage";
import { CreateRoomModal } from "./components/modals/CreateRoomModal";
import { JoinRoomModal } from "./components/modals/JoinRoomModal";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { ToastContainer } from "./components/ui/ToastContainer";
import { authAPI } from "./services/api";
import { Card } from "./components/ui/Card";

function AppRoutes() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppStore();
  const [authReady, setAuthReady] = useState(false);
  const [requiresTelegram, setRequiresTelegram] = useState(false);

  useEffect(() => {
    initTelegramWebApp();
    applyTelegramTheme();
    setupTelegramBackButton(() => navigate(-1));
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;
    const bootstrap = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const token = localStorage.getItem("access_token");
        if (token) {
          const user = await authAPI.loginByAccess(token);
          if (cancelled) return;
          dispatch({ type: "SET_USER", payload: user });
          return;
        }

        const initData = getTelegramInitData();
        if (!initData) {
          if (isTelegramWebApp()) return;
          if (!cancelled) setRequiresTelegram(true);
          return;
        }

        const loginResult = await authAPI.loginWithTelegram(initData);
        if (cancelled) return;
        localStorage.setItem("access_token", loginResult.token);
        dispatch({ type: "SET_USER", payload: loginResult.user });
      } catch {
        if (!cancelled) {
          localStorage.removeItem("access_token");
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: { type: "error", message: "Ошибка авторизации Telegram/JWT." },
          });
        }
      } finally {
        if (!cancelled) {
          dispatch({ type: "SET_LOADING", payload: false });
          setAuthReady(true);
        }
      }
    };
    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (!authReady && state.ui.loading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  if (requiresTelegram) {
    return (
      <MainLayout>
        <Card>
          <h2>Открой приложение через Telegram</h2>
          <p>Для реального входа нужен запуск из WebApp-кнопки бота.</p>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bonuses" element={<BonusesPage />} />
        <Route path="/leaders" element={<LeadersPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/games/roulette" element={<RoulettePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {state.ui.loading && <LoadingSpinner />}
      <CreateRoomModal />
      <JoinRoomModal />
      <ToastContainer />
    </MainLayout>
  );
}

export default function App() {
  return (
    <AppStoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppStoreProvider>
  );
}
