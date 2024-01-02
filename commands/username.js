const {SlashCommandBuilder} = require("discord.js")
const {request, fetch} = require("undici")

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("username")
        .setDescription("Generates a random username."),
    
    async execute(interaction) {
        let Query;
        const result = await fetch("https://1000randomnames.com");
        Query = await result.json();
    
        if (!Query.results) {
            console.log("Couldn't retrieve data");
            await interaction.reply({ content: "Failed to access trivia database. Try again later" });
            return;
        }

        console.log(Query);

    }
}