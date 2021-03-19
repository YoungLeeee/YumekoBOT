module.exports = {
	name: 'avatar',
    description: 'Mostra um avatar de um usuario',
    cooldown: 3,
    aliases: ['foto', 'imagem'],
    execute(message, args) {
        
        if (!message.mentions.users.size) {
			return message.channel.send(`O seu avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
        
        const avatarList = message.mentions.users.map(user => {
			return `Avatar de ${user.username}: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});
        
        // enviar todo o conjunto de cordas como uma mensagem
		// por defeito, discord.js irá `.join()`a matriz com `\n''.
		message.channel.send(avatarList);
    }
};