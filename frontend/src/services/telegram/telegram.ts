type TelegramWebApp = {
  initData?: string;
  initDataUnsafe?: { user?: { id: number; username?: string; first_name?: string } };
  themeParams?: Record<string, string>;
  ready: () => void;
  expand: () => void;
  BackButton: { show: () => void; hide: () => void; onClick: (cb: () => void) => void };
  HapticFeedback: { impactOccurred: (type: "light" | "medium" | "heavy") => void };
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function initTelegramWebApp() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return null;
  webApp.ready();
  webApp.expand();
  return webApp;
}

export function getTelegramUser() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user;
}

export function getTelegramInitData() {
  return window.Telegram?.WebApp?.initData;
}

export function isTelegramWebApp() {
  return Boolean(window.Telegram?.WebApp);
}

export function applyTelegramTheme() {
  const params = window.Telegram?.WebApp?.themeParams;
  if (!params) return;
  const root = document.documentElement;
  Object.entries(params).forEach(([key, value]) => {
    root.style.setProperty(`--tg-${key}`, value);
  });
}

export function setupTelegramBackButton(onBack: () => void) {
  const backButton = window.Telegram?.WebApp?.BackButton;
  if (!backButton) return;
  backButton.show();
  backButton.onClick(onBack);
}

export function hapticFeedback(type: "light" | "medium" | "heavy" = "light") {
  window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(type);
}
