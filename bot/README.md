# Telegram bot (WebApp launcher)

## Что это делает

Бот отправляет кнопку `web_app` с URL фронта. Telegram сам добавляет `initData` в `window.Telegram.WebApp.initData`.
Фронт уже отправляет это `initData` на backend: `POST /telegram/login/`.

## Запуск

1. Укажи URL фронта (обязательно HTTPS, например Vercel):

```bash
export WEBAPP_URL="https://your-frontend.vercel.app"
```

2. Укажи токен бота:

```bash
export BOT_TOKEN="PUT_YOUR_TOKEN_HERE"
```

3. Установи зависимости и запусти:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

## Использование

- `/start` — пришлет кнопку открытия WebApp
- `/set_menu` — попытается поставить кнопку WebApp в меню чата

