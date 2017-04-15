'use strict';

const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);

bot.on('contactRelationUpdate', (message) => {
    if (message.action === 'add') {

        let name = message.user ? message.user.name : 'there';
        const reply = new builder.Message()
            .address(message.address)
            .text('Hello ${name}... Thanks for adding me. Say \'hello\' to see some great demos.');
        bot.send(reply);
    } else {
        // delete their data
    }
});
bot.on('typing', (message) => {
    // User is typing
});
bot.on('deleteUserData', (message) => {
    // User asked to delete their data
});

bot.dialog('/', require('./worklog'));

bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /support/i]
    });

bot.dialog('ping', require('./ping'))
    .triggerAction({
        matches: [/(poke)/i, /ping/i, /are you alive?/i]
    });

module.exports = bot;