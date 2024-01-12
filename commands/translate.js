const {SlashCommandBuilder, Guild, EmbedBuilder} = require("discord.js")
const {request, fetch} = require("undici")

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translates a given message to French.")
        .addStringOption(option =>
			option.setName('message')
				.setDescription('The message to be translated.')
				.setRequired(true)),
    
    async execute(interaction) {
        
    }
}