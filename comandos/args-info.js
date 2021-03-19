module.exports = {
	name: 'args-info',
    description: 'Informação sobre os argumentos fornecidos.',
	args: true,
	cooldown: 3,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('ner');
		}

		message.channel.send(`Argumentos: ${args}\nComprimento dos argumentos: ${args.length}`);
	},
};