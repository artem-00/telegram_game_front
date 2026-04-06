import os
import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes


logging.basicConfig(level=logging.INFO)


WEBAPP_URL = os.environ.get("WEBAPP_URL", "").strip()


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return

    if not WEBAPP_URL:
        await update.message.reply_text(
            "WEBAPP_URL не задан. Укажи переменную окружения WEBAPP_URL (HTTPS URL фронта)."
        )
        return

    keyboard = InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton(
                    text="Открыть игру",
                    web_app=WebAppInfo(url=WEBAPP_URL),
                )
            ]
        ]
    )
    await update.message.reply_text(
        "Открой WebApp кнопкой ниже. Telegram передаст initData в приложение, "
        "а фронт отправит его на бэк (POST /telegram/login/).",
        reply_markup=keyboard,
    )


async def set_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message:
        return
    if not WEBAPP_URL:
        await update.message.reply_text("WEBAPP_URL не задан.")
        return
    await context.bot.set_chat_menu_button(
        menu_button={
            "type": "web_app",
            "text": "Играть",
            "web_app": {"url": WEBAPP_URL},
        }
    )
    await update.message.reply_text("MenuButton установлен (если клиент Telegram поддерживает).")


def main() -> None:
    token = os.environ.get("BOT_TOKEN", "").strip()
    if not token:
        raise SystemExit("BOT_TOKEN не задан.")

    app = Application.builder().token(token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("set_menu", set_menu))
    app.run_polling(close_loop=False)


if __name__ == "__main__":
    main()

