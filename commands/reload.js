const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a specified command')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command' , true).toLowerCase()
        const command = interaction.client.commands.get(commandName)

        if (!command) 
            return interaction.reply(`There's no command called \`${commandName}\`!`)

        delete require.cache[require.resolve(`./${commandName}.js`)]

        try {
            interaction.client.commands.delete(command.data.name)
            const newCommand = require(`./${commandName}.js`)
            interaction.client.commands.set(newCommand.data.name, newCommand)
            await interaction.reply(`Command \`${commandName}\` was reloaded!`)
        } catch (error) {
            console.error(error)
            await interaction.reply(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``)
        }
	},
};