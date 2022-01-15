import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { token, commands, clientID, guildID } from './config.js';

const rest = new REST({ version: '9' }).setToken(token);

try {
	console.log('Started refreshing application (/) commands.');

	await rest.put(
		Routes.applicationGuildCommands(clientID, guildID),
		{ body: commands },
	);

	console.log('Successfully reloaded application (/) commands.');
} catch (error) {
	console.error(error);
}