# Frontend

## API конфиг

Создайте `.env` в корне `frontend`:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

Если API опубликован с префиксом (например `/api`), укажите его в URL:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

## Подключенные backend-эндпоинты

- `POST /telegram/login/` -> `authAPI.loginWithTelegram(initData)`
- `POST /jwt/me/` -> `authAPI.loginByAccess(access)`
- `POST /players/` -> `userAPI.createPlayer({ player_id, name })`
- `GET /players/:playerId/` -> `userAPI.getPlayerById(playerId)`

## Запуск

```bash
npm install
npm run dev
```

## Реальный тест входа через Telegram

1. Подними фронт на публичном HTTPS-домене (для Telegram обычно нужен HTTPS).
2. У бота добавь кнопку `web_app` с URL фронта.
3. Открой приложение именно из кнопки бота.
4. Фронт отправит `initData` на `POST /telegram/login/` и сохранит `access_token`.
5. При повторных открытиях используется `POST /jwt/me/` для восстановления сессии.

## Деплой на Vercel (бесплатно) для тестов

1. Залей фронтенд в GitHub (или подключи репозиторий в Vercel).
2. В Vercel выбери проект `frontend/` (rootDirectory) и команду:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Добавь переменные окружения на Vercel:
   - `VITE_API_BASE_URL` (должен быть публичным HTTPS URL до твоего Docker-бэка)
4. Убедись, что роутинг SPA работает (для этого в проект добавлен `vercel.json` с rewrite).
5. Чтобы Telegram реально мог открыть WebApp, нужно:
   - в боте Telegram добавить домен Vercel (URL WebApp) в `web_app`
   - backend тоже должен быть доступен извне по HTTPS (для тестов удобно использовать tunnel, например ngrok/cloudflared)

Типичная проблема на старте: если `VITE_API_BASE_URL` указывает на локальный `localhost`, из Vercel он недоступен.
