const { Bot } = require('grammy');

const bot = new Bot('7754756966:AAF2Ohou8nuEX6ZRymmJboU9i-RTRGI9eWA'); 

const games = {};

bot.command('start', async (ctx) => {
    await ctx.reply(
        'Привет! Я бот для игры "Угадай число".\n' +
        'Чтобы начать игру, введи команду /play\n' +
        'Я загадаю число от 1 до 100, а ты попробуешь его угадать!'
    );
});

bot.command('play', async (ctx) => {
    const chatId = ctx.chat.id;
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    games[chatId] = secretNumber;
    await ctx.reply('Я загадал число от 1 до 100! Попробуй угадать!');
});

bot.on('message:text', async (ctx) => {
    const chatId = ctx.chat.id;
    const messageText = ctx.message.text;
    
    if (games[chatId] === undefined) return;
    const guess = parseInt(messageText);
    
    if (isNaN(guess)) {
        await ctx.reply('Пожалуйста, введите число!');
        return;
    }
    
    const secretNumber = games[chatId];
    
    if (guess < secretNumber) {
        await ctx.reply('Больше!');
    } else if (guess > secretNumber) {
        await ctx.reply('Меньше!');
    } else {
        await ctx.reply('Поздравляю! Ты угадал число!');
        delete games[chatId];
    }
});

bot.start();
console.log('Бот запущен и готов к игре!');