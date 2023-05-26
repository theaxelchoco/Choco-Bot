/*
Client is ready to be used
*/

const {Events} = require("discord.js")

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Client's ready. Logged in as ${client.user.tag}`)
       // client.user.setActivity("teb help",{type: 'STREAMING'})
    },
}