const { prefix, dono } = require('../config.json');
module.exports = {
	name: 'mute',
    description: 'Muta um usuario',
    args: true,
    usage: '[membro] [razao]',
    execute(message, args) {
        if (message.channel.type === 'dm') {
            message.reply('Não posso executar esse comando dentro dos DMs!')
            return
        }
        let membro = message.mentions.members.first() || mesage.guild.members.cache.get(args[0])
        if (membro === message.member) return message.reply(`você não pode mutar você mesmo.`)

        const motivo = args.slice(1).join(" ");

        if (!motivo) return message.reply(`escreva o motivo! ex.: \`\`${prefix}mute @membro [motivo]\`\``)
        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`você precisa da permissão **Mutar Membros**.`)
        if (membro.hasPermission("MUTE_MEMBERS")) return message.reply(`não posso mutar esse membro pois ele possui a permissão: \`**Mutar Membros**\``)
// colocar aqui sistema de criar cargo

        if(membro.id === dono) {
            return message.reply(`não posso mutar meu criador, seria como um filho cortar a lingua do pai!`)
        }

        if(!message.guild.roles.cache.find(a => a.name === "mutadoparadox")){     
            return message.reply(`para que consiga mutar mebros você precisa configurar cargos com \`${prefix}configcargos\``)
        }


        const cargo = message.guild.roles.cache.find(a => a.name === "mutadoparadox")
        const role = cargo.id
        
        message.guild.channels.cache.forEach(channel => {channel.createOverwrite(role, {SEND_MESSAGES: false, SPEAK: false})});

        if (membro.roles.cache.has(role)) {
            return message.reply(`este membro já foi mutado.`)
        }

           // message.guild.channels.cache.forEach(channel => {channel.createOverwrite(message.guide.id, {SEND_MESSAGES: false, SPEAK: false})});

//=======================================================================================================
        message.reply(`você realmente deseja mutar esse usuário?`).then(msg => {
            msg.react("✅")
     
            let filtro = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})
     
            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                const motivo = args.slice(1).join(" ");
                message.channel.send(`\`\`\`diff\n- MEMBRO MUTADO\n- Motivo: ${motivo}\`\`\``)
                membro.roles.add(role)
            })
        })
    }
};