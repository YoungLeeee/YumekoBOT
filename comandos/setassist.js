const { dono } = require('../config.json');
module.exports = {
	name: 'setassist',
    description: 'Colocar oque o bot está assistindo, Maximo duas palavras',
    dono: true,
    usage: '[frase]',
    execute(message, args) {
        if (!args.length) return message.channel.send(`Você não colocou nada para o bot assistir, ${message.author}!`);
        const commandName = args.join(' ')
        /*const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));*/
        message.client.user.setActivity(`${commandName}`, { type: 'WATCHING' });
        message.reply(`agora estou assistindo ${commandName }`)
    }
}