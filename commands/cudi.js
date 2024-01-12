const {SlashCommandBuilder, Guild, EmbedBuilder} = require("discord.js")
const {request, fetch} = require("undici")

const {GIFKey} = require("../config.json")
const SearchTerm = "kid+cudi"

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("cudi")
        .setDescription("Generates a gif of Kid Cudi."),
    
    async execute(interaction) {
        const EmbedResponse = new EmbedBuilder()
        
        let Query;
        const result = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIFKey}&q=${SearchTerm}&limit=15`);
        Query = await result.json();
    
        if (!Query) {
            console.log("Couldn't retrieve data");
            EmbedResponse.setImage("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGtybjNkbjJldzA5ZjhyNXd1bGpibGoyOGhvdGs4NHd5dHR2OHhjZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m8ou5Eny9qoObXTHm4/giphy.gif") 
            return;
        }

        let Rand = Math.floor(Math.random() * 15);
        let Data = Query.data[Rand]
        EmbedResponse.setImage(Data.images.original.url) 
        
            
        //interaction.reply({embeds: [EmbedResponse]})
        await interaction.reply({content: `Here you go!\nThe name of this gif is **${Data.title}**`, ephemeral: true})
        interaction.channel.send({embeds: [EmbedResponse]})
    }
}