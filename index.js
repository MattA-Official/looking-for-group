import { Client, Intents } from 'discord.js';
import { token, roleID, channelID, logChannelID } from './config.js';

const client = new Client({ 
	intents: [Intents.FLAGS.GUILDS]
});
const cooldown = new Map();

client.once('ready', () => {
	console.log('Ready!');

	client.log = client.channels.cache.get(logChannelID);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	switch (interaction.commandName) {
		case 'ping':
			// Reply with the bot's ping
			await interaction.reply(`Pong! ${client.ws.ping}`);
			break;

		case 'toggle':
			let reply;

			// Check if the user has the role
			if (interaction.member.roles.cache.has(roleID)) {
				// Remove the role
				await interaction.member.roles.remove(roleID);
				reply = `Removed <@&${roleID}> role!`;
			} else {
				// Add the role
				await interaction.member.roles.add(roleID);
				reply = `Added <@&${roleID}> role!`;
			}

			// Reply with the result
			await interaction.reply({ content: reply, ephemeral: true });
			break;

		case 'mention':
			// lock to one channel
			if (interaction.channelId !== channelID) return interaction.reply({ content: `This command can only be used in <#${channelID}>`, ephemeral: true });
			// only allow to be mentioned once every 10 minutes
			if (cooldown.has(interaction.member.id)) {
				// get the time now and when the command was last used
				const last = cooldown.get(interaction.member.id);
				const now = Date.now();

				// if the time now is less than the time the command was last used plus 10 minutes, return
				if (now - last < 10 * 60 * 1000) {
					return interaction.reply({ content: `You can only mention <@&${roleID}> once every 10 minutes!`, ephemeral: true });
				}
			}

			// set the time now as the last time the command was used
			cooldown.set(interaction.member.id, Date.now());

			// mention the role
			await interaction.reply({ content: `<@&${roleID}> - ${interaction.member} is looking for a team`, allowedMentions: { roles: [roleID] } });
			break;
	}

	await client.log.send(`**${interaction.user.tag}** used command \`/${interaction.commandName}\` in ${interaction.channel}`);
});

client.login(token);
