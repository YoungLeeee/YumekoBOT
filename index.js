const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, dono, idbot } = require('./config.json');

const chalk = require('chalk');

const cooldowns = new Discord.Collection();

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`Bot Carregado, estou online!`);
	client.user.setActivity(`yumeko no topo`, { type: 'WATCHING' });
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (message.channel.type === 'text') {
		console.log(chalk.yellowBright('[LOG CONVERSA]'), `Servidor: '${message.guild.name}' | Canal: '${message.channel.name}' | Usuário ${message.author.tag}: ${message.content} |`);
/*	} else if (message.channel.type === 'dm' && message.author.id !== idbot && message.content.startsWith(prefix)) { //esse id é o id do bot!
		console.log(chalk.greenBright('[LOG PV]'), `Usuário ${message.author.tag}: ${message.content} |`)
		return message.reply('Não posso executar esse comando dentro dos DMs!') */
	} else if (message.channel.type === 'dm' && message.author.id !== idbot) {
		console.log(chalk.greenBright('[LOG PV]'), `Usuário ${message.author.tag}: ${message.content} |`)
	}


	if (!message.content.startsWith(prefix) || message.author.bot) return;	
	
	if (!command) return;

	if (command.dono && message.author.id !== dono)
		return message.channel.send(`Você não é uma pessoa especial, ${message.author}`);
	
	if (command.args && !args.length) {
		let reply = `Você não forneceu nenhum argumento, ${message.author}!`;

		if (command.usage) {
			reply += `\nO uso adequado do comando é: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`Por favor espere ${timeLeft.toFixed(1)} segundos para utilizar o comando \`${prefix}${command.name}\` novamente.`);
	}}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Houve um erro ao tentar executar esse comando!');
	}

	});
client.login(token);