module.exports = {
	name: 'clear',
    description: 'Limpa de 1 a 99 Mensagens em um Canal Expecifico',
    cooldown: 3,
	aliases: ['limpar', 'apagar'],
	args: true,
	usage: '[1 a 99]',
    execute(message, args) {
		if (message.channel.type === 'dm') {
            message.reply('Não posso executar esse comando dentro dos DMs!')
            return
        }
        const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('não parece ser um número válido.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('é necessário colocar um número entre 1 e 99.');
		} else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.reply(`você precisa da permissão **Gerenciar Mensagens**`)
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Ocorreu um erro ao tentar apagar mensagens neste canal!');
		})
	}
}