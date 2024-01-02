const {SlashCommandBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType} = require("discord.js")
const {request, fetch} = require("undici")

/*
let Question;

fetch("https://opentdb.com/api.php?amount=1")
        .then((response) =>{
            return response.json()
        })
        .then((data) =>{
            Question = data
            console.log(data)
        })
        .then(() =>{
            console.log(Question)
        })

        console.log(Question)
        */

module.exports = {
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("trivia")
        .setDescription("Gives a random trivia question. Try to solve!"),
    
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
            console.log(Details);

            await interaction.reply(Details.question)

            //Details.correct_answer


        }
    
}