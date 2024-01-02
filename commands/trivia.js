const {SlashCommandBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, Collector} = require("discord.js")
const {request, fetch} = require("undici")
const he = require('he');

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
        let Answered = false

        let Question = Details.question + "\nOptions: "
        let Rand = Math.floor(Math.random() * Details.incorrect_answers.length) + 1;

        for (let i = 0; i < Details.incorrect_answers.length; i++) {
            if (Rand == i){
                Rand = -1;
                Question += Details.correct_answer + ", ";
            }
                
            Question += Details.incorrect_answers[i] + ", ";
        }

        if (Rand > 0){
            Question += Details.correct_answer;
        }
        
        Question = he.decode(Question)
        const decodedCorrect = he.decode(Details.correct_answer)
        
        await interaction.reply({content: Question})
        
        const collectFilter = response => Details.correct_answer.toLowerCase() === response.content.toLowerCase()
        const collector = interaction.channel.createMessageCollector({filter: collectFilter, max: 1, time: 30_000})
       
        collector.on('collect', message => {
            Answered = true
            interaction.followUp(message.author.username + " got it correct!")
        })

        collector.on('end', message => {
            if (!Answered)
                interaction.followUp("The answer was " + decodedCorrect + "!")
        })
        
    }
    
}