const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    data: {
        name: "ping",
        description: "Ping del bot"
    },
    execute(interaction){
        const pingEmbed = new MessageEmbed()
        .setTitle("Ping bot")
        .setColor("DARK_PURPLE")
        .setDescription(`Il ping del bot è ${client.ws.ping}ms`)

        interaction.reply({embeds: [pingEmbed]})
    }
}