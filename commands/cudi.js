const {SlashCommandBuilder, Guild} = require("discord.js")
const {request, fetch} = require("undici")

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("cudi")
        .setDescription("Generates a gif of Kid Cudi."),
    
    async execute(interaction) {
        

        await interaction.reply({content: "Your generated username is"})
    }
}