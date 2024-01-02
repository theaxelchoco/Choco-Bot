const {SlashCommandBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Collector} = require("discord.js")
const {request, fetch} = require("undici")
const he = require('he');

module.exports = {
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("trivia")
        .setDescription("Gives a random trivia question along with the answer."),
    
    async execute(interaction) {
        const client = interaction.user.client;
    
        let Query;
        const result = await fetch("https://opentdb.com/api.php?amount=1");
        Query = await result.json();
    
        if (!Query.results) {
            console.log("Couldn't retrieve data");
            await interaction.reply({ content: "Failed to access trivia database. Try again later" });
            return;
        }
    
        const Details = Query.results[0];
        //console.log(Details);

        let Question = "Question: " + Details.question + "\nAnswer: " + Details.correct_answer
        
        Question = he.decode(Question)
        await interaction.reply({content: Question})
    }
    
}