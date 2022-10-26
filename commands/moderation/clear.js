module.exports = {
    name: "clear",
    data: {
        name: "clear",
        description: "Elimina messaggi",
        options: [
            {
                name: "amount",
                description: "Seleziona la quantità di messaggi da eliminare",
                type: "INTEGER",
                required: true
            }
        ]
    },
    execute(interaction){
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")){
           return interaction.reply({ content: "Non hai il permesso per eseguire questo comando", ephemeral: true})
        }
        let Amount = interaction.options.getInteger("amount")
        if(Amount > 100) {
            return interaction.reply({ content: "Puoi eliminare fino ad un massimo di **100 messaggi** per volta", ephemeral: true})
         }
         if(Amount < 1) {
            return interaction.reply({ content: "Puoi eliminare fino ad un minimo di **1 messaggo** per volta", ephemeral: true})
         }
        let embedclear = new Discord.MessageEmbed()
        .setTitle("Clear")
        .setDescription(`🧹 Hai eliminato ` + Amount + ` messaggi`)
        .setColor("DARK_GREEN")

        interaction.channel.bulkDelete(Amount, true)
        interaction.reply({ embeds: [embedclear], ephemeral: true })
    }
}