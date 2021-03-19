const { GuildMember, Guild } = require("discord.js");
const { prefix } = require('../config.json');
module.exports = {
	name: 'kick',
    description: 'Kicka um usuario',
    args: true,
    usage: '[membro] [razao]',
    execute(message, args) {
        if (message.channel.type === 'dm') {
            message.reply('Não posso executar esse comando dentro dos DMs!')
            return
        }
        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        //if (!membro) return message.reply(`Mencione um usuario! ex.: \`\`${prefix}ban @membro [motivo]\`\``)
        if (membro === message.member) return message.reply(`você não pode kickar você mesmo.`)
     
        const motivo = args.slice(1).join(" ");
    //    if(!motivo){motivo = "Indefinido"}
        if (!motivo) return message.reply(`escreva o motivo! ex.: \`\`${prefix}kick @membro [motivo]\`\``)
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`você precisa da permissão **Kickar Membros**.`)
        if (membro.hasPermission("KICK_MEMBERS")) return message.reply(`não posso kickar esse membro pois ele possui a permissão: \`**Kickar Membros**\``)

        if(membro.id === dono) {
            return message.reply(`não posso kickar meu criador, seria como um filho expulsar o própio do pai de casa!`)
        }
     
        message.reply(`você realmente deseja kickar esse usuário?`).then(msg => {
            msg.react("✅")
     
            let filtro = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})
     
            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                message.channel.send(`\`\`\`diff\n- MEMBRO KICKADO\n- Motivo: ${motivo}\`\`\``)
                membro.kick({reason: `${motivo}`});
            })
        })
    },
};