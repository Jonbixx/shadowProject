const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "echodm",
    data: {
        name: "echodm",
        description: "Invia un messaggio privato ad un utente nei dm con il bot",
        options: [
            {
                name: "text",
                description: "Inserisci un testo",
                type: "STRING",
                required: true
            },
            {
                name: "user",
                description: "Utente a cui inviare il testo",
                type: "USER",
                required: true
            }
        ]
    },
    async execute(interaction){
        if (!interaction.member.permissions.has("ADMINISTRATOR")){
            return interaction.reply({ content: "Non hai il permesso per eseguire questo comando", ephemeral: true})
         }
        const text = interaction.options.getString("text");
        const target = interaction.options.getUser("user");

        const echodmEmbedcatch = new MessageEmbed()
        .setTitle("DM bloccati")
        .setDescription(`${target} non può ricevere messaggi privati`)
        .setColor("LIGHT_GREY")

        try {
           await target.send(text)
            
        const messinviatoEmbed = new MessageEmbed()
        .setTitle("Messaggio inviato")
        .setDescription(`Il tuo messaggio è stato inviato con successo a ${target}`)
        .setColor("AQUA")
        
        interaction.reply({embeds: [messinviatoEmbed]})
        } catch (error) {
            interaction.reply({embeds: [echodmEmbedcatch], ephemeral: true}) 
        }

    }
}