const { CommandInteraction, MessageManager, MessageEmbed } = require("discord.js")

module.exports = {
    name: "embed",
    data: {
        name: "embed",
        description: "Crea il tuo messaggio embed",
        options: [
            {
                name: "title",
                description: "Imposta il titolo dell\'embed",
                type: "STRING",
                required: false
            },
            {
                name: "description",
                description: "Imposta la descrizione dell\'embed",
                type: "STRING",
                required: false
            },
            {
                name: "footer",
                description: "Imposta il footer dell\'embed",
                type: "STRING",
                required: false
            },
        ]
    },
    /**
     * @param {CommandInteraction} interaction 
     */
    execute(interaction){
        const title = interaction.options.getString("title") 
        const description = interaction.options.getString("description") 
        const footer = interaction.options.getString("footer") 

        const CreateEmbed = new MessageEmbed()
        .setTitle(`${title}`) 
        .setDescription(`${description}`)   
        .setFooter({text: `${footer}`}) 
        .setColor("RANDOM") 

        interaction.reply({embeds: [CreateEmbed]})
        
        

    }
}