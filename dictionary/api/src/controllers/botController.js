const Bot = require('node-telegram-bot');

const { WordRepository } = require('../data/WordRepository');

const telegramBots = {
  mikeToken: '358006580:AAEpwmiTTUW6SoBZYUqIVDc3n6r7nxOTOQA',
  anyaToken: '327991496:AAGcI_Mz4Zf46VH6EKYJqfC8_gHSeDTERCo',
};

function processTelegramMSG(bot, user_id) {
  return async function({ chat, text }) {
    try {
      const data = await WordRepository.createWordForUser({
        word: text,
        user_id,
      });
      const { word, transcription, translation } = JSON.parse(
        JSON.stringify(data),
      );
      bot.sendMessage({
        chat_id: chat.id,
        text: `${word} - ${transcription} - ${translation}`,
        parse_mode: 'Markdown',
      });
    } catch (e) {
      const { error, status } = e;
      bot.sendMessage({
        chat_id: chat.id,
        text: `${status} - ${error}`,
        parse_mode: 'Markdown',
      });
    }
  };
}

module.exports = function initBots() {
  const MikeRudenkoBot = new Bot({
    token: telegramBots.mikeToken,
  });

  const AnyaBot = new Bot({
    token: telegramBots.anyaToken,
  });

  MikeRudenkoBot.on('message', processTelegramMSG(MikeRudenkoBot, 1));
  MikeRudenkoBot.start();

  AnyaBot.on('message', processTelegramMSG(AnyaBot, 2));
  AnyaBot.start();
};
