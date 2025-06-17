const { Bot, InlineKeyboard } = require('grammy');
require('dotenv').config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Приветствие', 'hello')
        .text('Помощь', 'help')
        .row()
        .text('Информация', 'info')
        .text('Настройки', 'settings');

    await ctx.reply(
        '👋 Добро пожаловать! Выберите действие:',
        { reply_markup: keyboard }
    );
});

bot.on('callback_query:data', async (ctx) => {
    const action = ctx.callbackQuery.data;
    
    switch (action) {
        case 'hello':
            await ctx.reply('Привет, ' + ctx.from.first_name + '! 😊');
            break;
            
        case 'help':
            await ctx.reply('ℹ️ Это бот с кнопками. Просто нажимайте на кнопки для взаимодействия!');
            break;
            
        case 'info':
            const infoKeyboard = new InlineKeyboard()
                .text('Автор', 'author')
                .text('Версия', 'version');
                
            await ctx.reply('Что вас интересует?', { reply_markup: infoKeyboard });
            break;
            
        case 'settings':
            await ctx.reply('⚙️ Настройки пока не доступны');
            break;
            
        case 'author':
            await ctx.reply('Автор: Ваше Имя\nGitHub: github.com/ваш-логин');
            break;
            
        case 'version':
            await ctx.reply('Версия бота: 1.0.0');
            break;
            
        default:
            await ctx.reply('Неизвестная команда');
    }
    
    await ctx.answerCallbackQuery();
});

bot.on('message', async (ctx) => {
    await ctx.reply('Используйте команду /start для начала работы');
});

bot.start();
console.log('Бот с кнопками запущен!');