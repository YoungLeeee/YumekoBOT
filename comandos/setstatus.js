const { dono } = require('../config.json');
module.exports = {
	name: 'setstatus',
    description: 'Colocar o status do bot',
    dono: true,
    usage: '[online, idle, dnd, invisible]',
    execute(message, args) {
        if (!args.length) {
            message.channel.send(`Você não colocou nenhum status, ${message.author}!`)
        }
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (commandName === 'online' || commandName === 'idle' || commandName === 'dnd' || commandName === 'invisible') {
            message.client.user.setStatus(`${args}`)
            message.channel.send(`Status setado como **${args}**`);
        } else return message.channel.send(`Status Invalido`)
    }
}