const {SlashCommandBuilder} = require("discord.js")
const {request, fetch} = require("undici")

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("username")
        .setDescription("Generates a random username."),
    
    async execute(interaction) {
        let Query;
        const result = await fetch("https://random-data-api.com/api/v2/users");
        Query = await result.json();
    
        if (!Query) {
            console.log("Couldn't retrieve data");
            await interaction.reply({ content: "Failed to access database. Try again later" });
            return;
        }

        await interaction.reply({content: "Your generated username is "+ Query.username})
    }
}