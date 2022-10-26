const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, GuildScheduledEvent } = require("discord.js");

module.exports = {
    name: "suggest",
    data: {
        name: "suggest",
        description: "Crea un suggerimento",
        options: [
            {
                name: "type",
                description: "Seleziona il tipo di suggerimento",
                type: "STRING",
                required: true,
                choices: [
                    {
                        name: "Comando",
                        value: "Comando"
                    },
                    {
                        name: "Evento",
                        value: "Evento"
                    },
                    {
                        name: "Sistema",
                        value: "Sistema"
                    },
                ]
            },
            {
                name: "nome",
                description: "Dai un nome al tuo suggerimento",
                type: "STRING",
                required: true,
            },
            {
                name: "funzionalità",
                description: "Descrivi la funzionalità di questo suggerimento",
                type: "STRING",
                required: false
            },
        ],
        },
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
         async execute(interaction){
            const { options } = interaction;

            const type = options.getString("type");
            const name = options.getString("nome");
            const funzione = options.getString("funzionalità") || "Non specificata"
            const canaleSuggest = client.channels.cache.get("1031900869710598174");
            const chatStaff = client.channels.cache.get("1033420657637216378");



            const risposta = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({dynamic: true}))
            .setTitle("Suggerimento")
            .setColor("YELLOW")
            .setDescription(`${interaction.member} ha proposto un suggerimento di tipo: ${type}`)
            .addField("Nome", `${name}`, true)
            .addField("Funzionalità", `${funzione}`, true)

            const approva = new MessageButton()
            .setCustomId("accept")
            .setLabel("Approva")
            .setStyle("SUCCESS")
        
            const rifiuta = new MessageButton()
            .setCustomId("rifiuta")
            .setLabel("Rifiuta") 
            .setStyle("DANGER")
        
            const rowSuggest = new MessageActionRow()
            .addComponents(approva)
            .addComponents(rifiuta)

            interaction.reply({content: "Il tuo suggerimento è stato inviato con successo, varrà valutato dallo staff che deciderà se pubblicarlo o meno in <#1031900869710598174>", ephemeral: true})
            
            chatStaff.send({embeds: [risposta], components: [rowSuggest]})

    }
}
