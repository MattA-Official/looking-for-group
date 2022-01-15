import 'dotenv/config';

export const token = process.env.TOKEN;

export const commands = [
	{
		name: 'ping',
		description: 'Check the bot\'s ping',
	},
	{
		name: 'toggle',
		description: 'Toggle the looking for team role',
	},
	{
		name: 'mention',
		description: 'Mention the looking for team role',
	},
]

export const clientID = '927282767828504676';
export const guildID = '575001822998298642';
export const roleID = '927288221107384390';
export const channelID = '816652733226287104';
export const logChannelID = '827476327014858773';