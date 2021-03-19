const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'prefix',
	description: 'Comando para olhar qual a prefix do bot.',
	aliases: ['prefixo'],
	usage: '[command]',
	cooldown: 5,
	execute(message, args) {
            message.reply(`você pode usar \`${prefix}\` como meu prefix`);
    }
}
