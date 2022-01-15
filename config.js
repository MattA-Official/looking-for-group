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
export const guildID = '910072572228550696';
export const roleID = '932038060458250271';
export const channelID = '926003865789284373';
export const logChannelID = '910072572606046273';