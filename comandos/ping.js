module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 3,
	execute(message, args) {
		message.channel.send(`Ping: **${parseInt(message.client.ws.ping)} ms**`);
	},
};