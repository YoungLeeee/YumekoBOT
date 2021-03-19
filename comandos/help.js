const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Listar todos os meus comandos ou informações sobre um comando específico.',
	aliases: ['commands'],
	usage: '[command]',
	cooldown: 5,
	execute(message, args) {
			const data = [];
			const { commands } = message.client;
		if (!args.length) {
			const title = 'Aqui está uma lista de todos os meus comandos:';
			const description = data.push(commands.map(command => command.name).join('\n '));
			const footer = `Você pode enviar ${prefix}help [nome do comando] para obter informações sobre um comando específico!`;
				const helpEmbed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setTitle(title)
				.setDescription(data)
				.setTimestamp()
				.setFooter(footer);
			return message.author.send(helpEmbed)
			   .then(() => {
				   if (message.channel.type === 'dm') return;
				   message.reply('enviei um DM com todos os meus comandos!');
			   })
			   .catch(error => {
				console.error(`Não foi possível enviar DM para ${message.author.tag}.\n`, error);
				message.reply('parece que não posso mandar DM para você!');
			});
			}

			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('isso não é um comando válido!');
			}

			data.push(`\`\`\`css\n- Nome: ${command.name}`);

			if (command.aliases) data.push(`- Aliases: ${command.aliases.join(', ')}`);
			if (command.description) data.push(`- Descrição: ${command.description}`);
			if (command.usage) data.push(`- Forma de Uso: ${prefix}${command.name} ${command.usage}`);

			data.push(`- Tempo de Espera: ${command.cooldown || 3} segundo(s)\`\`\``);

			message.channel.send(data, { split: true });
			}
		}