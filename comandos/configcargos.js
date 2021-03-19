module.exports = {
	name: 'configcargos',
    description: 'Configura todos os cargos necessarios para que o comando mute funcione',
    cooldown: 60,
    execute(message) {
        if (message.channel.type === 'dm') {
            message.reply('Não posso executar esse comando dentro dos DMs!')
            return
        }
        if(!message.guild.roles.cache.find(a => a.name === "mutadoparadox")){
            message.guild.roles.create({ data: {name: 'mutadoparadox', color: 'BLACK', mentionable: 'false'}})
            //message.guild.channels.cache.forEach(channel => {channel.createOverwrite(role, {SEND_MESSAGES: false, SPEAK: false})});
            return message.reply(`cargos configurados!`)
        } else {
            return message.reply(`os cargos já foram configurados!`)
        }
    }
}
