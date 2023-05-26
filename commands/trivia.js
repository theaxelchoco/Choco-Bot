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
        
            const row = new ActionRowBuilder();
            const buttons = [
                new ButtonBuilder()
                    .setCustomId("CorrectAnswer")
                    .setLabel(Details.correct_answer)
                    .setStyle('Secondary')
                    .setDisabled(false),
        
                ...Details.incorrect_answers.map(answer => new ButtonBuilder()
                    .setCustomId(answer)
                    .setLabel(answer)
                    .setStyle('Secondary')
                    .setDisabled(false))
            ];
        
            // Randomize the position of the buttons using splice
            for (let i = buttons.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
            }
            
            row.addComponents(buttons);
        
            // Defer the reply until later in the code
            await interaction.deferReply();
        
            // Create a collector to handle button clicks
            const filter = (interaction) => interaction.user.id === interaction.member.id;
            const collector = interaction.channel.createMessageComponentCollector({
                filter, componentType: ComponentType.Button, time: 15000 // 15 second timeout
            });
        
            // Handle button clicks
            collector.on("collect", async (interaction) => {
                console.log("Clicked button");
            
                // Find the button that was clicked
                const clickedButton = buttons.find(button => button.customId === interaction.customId);
            
                // Disable the button that was clicked
                if (clickedButton) {
                    clickedButton.setDisabled(true);
                    const clickedComponent = row.components.find(component => component.customId === clickedButton.customId);
                    if (clickedComponent) {
                        clickedComponent.update({ disabled: true });
                    }
                }
            
                await interaction.update({ components: [row] });
            
                if (interaction.customId === "CorrectAnswer") {
                    await interaction.editReply({ content: "Correct!" });
                } else {
                    await interaction.editReply({ content: "Incorrect." });
                }
            
                collector.stop();
            });
        
            // Enable the buttons, then edit the initial reply
            for (const button of buttons) {
                button.setDisabled(false);
            }
            await interaction.editReply({ content: `${Details.question}`, components: [row], ephemeral: true });
        }
    
}