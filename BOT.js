const { Bot } = require('grammy');

const bot = new Bot('7334139721:AAGW6rsalBlkLkR5ZQ80y8xNc45aJ6Jh1uA');

const jokes = [
  "Почему программисты путают Хэллоуин и Рождество? Потому что Oct 31 == Dec 25!",
  "Как называют программиста, который не любит кофе? Он Java-скриптер!",
  "Почему программист вышел из дома? Потому что у него не было RAM!",
  "Сколько программистов нужно, чтобы вкрутить лампочку? Ни одного, это hardware проблема!",
  "Почему 1 боится 0? Потому что 1 0 0 1!"
];

bot.command('start', async (ctx) => {
  await ctx.reply('Привет! Я простой Telegram-бот.\nЯ могу отвечать на команды /help, /echo и /joke.\nПопробуй что-нибудь!');
});

bot.command('help', async (ctx) => {
  await ctx.reply('Доступные команды:\n' +
    '/start - Начать работу с ботом\n' +
    '/help - Получить список команд\n' +
    '/echo [текст] - Повторить ваш текст\n' +
    '/joke - Получить случайную шутку');
});

bot.command('echo', async (ctx) => {
  const text = ctx.message.text.substring(6); // Удаляем "/echo " из сообщения
  if (text.trim() === '') {
    await ctx.reply('Пожалуйста, напишите текст после команды /echo');
  } else {
    await ctx.reply(text);
  }
});

bot.command('joke', async (ctx) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  await ctx.reply(randomJoke);
});

bot.on('message', async (ctx) => {
  await ctx.reply('Я не понимаю ваше сообщение. Попробуйте команду /help');
});

bot.start();
console.log('Бот запущен...');