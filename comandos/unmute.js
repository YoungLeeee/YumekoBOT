const { prefix } = require('../config.json');
module.exports = {
	name: 'unmute',
    description: 'Desmuta um usuario',
    args: true,
    usage: '[Membro]',
    execute(message) {
        if (message.channel.type === 'dm') {
            message.reply('Não posso executar esse comando dentro dos DMs!')
            return
        }
        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (membro === message.member) return message.reply(`você não pode mutar você mesmo.`)

        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`você precisa da permissão **Mutar Membros**.`)
        if (membro.hasPermission("MUTE_MEMBERS")) return message.reply(`não posso desmutar esse membro pois ele possui a permissão: \`**Mutar Membros**\`, afinal como que mutaram ele?`)
// colocar aqui sistema de criar cargo

        if(!message.guild.roles.cache.find(a => a.name === "mutadoparadox")){     
            return message.reply(`para que consiga mutar mebros você precisa configurar cargos com \`${prefix}configcargos\``)
        }

        const cargo = message.guild.roles.cache.find(a => a.name === "mutadoparadox")
        const role = cargo.id

        if (!membro.roles.cache.has(role)) {
            return message.reply(`este membro não está mutado.`)
        }
//=======================================================================================================
        message.reply(`você realmente deseja desmutar esse usuário?`).then(msg => {
            msg.react("✅")
     
            let filtro = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})
     
            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                message.channel.send(`\`\`\`diff\n- MEMBRO DESMUTADO\`\`\``)
                membro.roles.remove(role)
            })
        })
    }
};