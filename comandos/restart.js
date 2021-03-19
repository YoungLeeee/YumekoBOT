const { dono, prefix } = require('../config.json');
module.exports = {
	name: 'restart',
    description: 'Reiniciar o bot',
    dono: true,
    usage: '[comando]',
    execute(message, args) { 
        if (!args.length) return message.channel.send(`Você nao colocou a palavra "sim" para reiniciar o bot, ${message.author}!`);
        if (args === 'sim') return process.exit();
    }
}