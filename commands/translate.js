const {SlashCommandBuilder, Guild, EmbedBuilder} = require("discord.js")
const {Translate} = require('@google-cloud/translate').v2

const Translator = new Translate()
async function TranslateText(Text, Language) {
    console.log(Text, Language)
    let [Translations] = await Translator.translate(Text, Language)
    Translations = Array.isArray(Translations) ? Translations: [Translations]

    let Response = ""
    Translations.forEach((Translation, i) => {
        Response += Translation
    });

    return Response
}

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translates a given message to French.")
        .addStringOption(option =>
			option.setName('message')
				.setDescription('The message to be translated.')
				.setRequired(true))
        .addStringOption(option =>
            option.setName('language')
                .setDescription('The language to be translated to.')
                .setRequired(true)
                .addChoices(
                    {name: "French", value: "fr"},
                    {name: "Yoruba", value: "yo"},
                    {name: "Spanish", value: "es"},
                    {name: "Japanese", value: "ja"},
                    {name: "Russian", value: "ru"},
                )),
    
    async execute(interaction) {
        const InputText = interaction.options.getString('message' , true)
        const Language =  interaction.options.getString('language', true) 

        TranslateText(InputText, Language)
            .then(async Translation => {
                await interaction.reply({content: Translation})
            } )
    }
}