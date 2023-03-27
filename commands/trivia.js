const {SlashCommandBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js")
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
    data: new SlashCommandBuilder()
        .setName("trivia")
        .setDescription("Gives a random trivia question. Try to solve!"),
    
    async execute(interaction) {

        let Query
        const result = await fetch("https://opentdb.com/api.php?amount=1")
        Query = await result.json();
        const Details = Query.results[0]

        const row = new ActionRowBuilder()
        console.log(Details)

        //Load Options
        const buttons = [
            new ButtonBuilder().setCustomId("CorrectAnswer").setLabel(Details.correct_answer).setStyle('Secondary'),
            ...Details.incorrect_answers.map(answer => new ButtonBuilder().setCustomId(answer).setLabel(answer).setStyle('Secondary'))
          ];

        // Randomize the position of the buttons using splice
        for (let i = buttons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
        }

        row.addComponents(buttons);
        
        await interaction.reply({content: `${Details.question}`, components: [row]})
    }
}