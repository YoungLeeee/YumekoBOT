const { dono } = require('../config.json');
module.exports = {
	name: 'reload',
    description: 'Recarregar um comando',
    dono: true,
	execute(message, args) {

        if (!args.length) return message.channel.send(`Não colocou nenhum comando para recarregar, ${message.author}!`);
        //if (message.author.id !== dono) return message.channel.send(`Você não é uma pessoa especial, ${message.author}!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
        	|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`Não há nenhum comando com esse nome ou alias \`${commandName}\`, ${message.author}!`);
        
        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            message.channel.send(`Houve um erro durante o reload de um comando \`${command.name}\`:\n\`${error.message}\``);
        }
        message.channel.send(`O Comando \`${command.name}\` foi recarregado!`);
        
        
    },
};