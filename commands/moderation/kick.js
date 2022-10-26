const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kick",
    data: {
        name: "kick",
          description: "Espelli un utente",
          options: [
              {
                  name: "user",
                  description: "Utente da espellere",
                  type: "USER",
                  required: true
              },
              {
                  name: "reason",
                  description: "Motivazione",
                  type: "STRING",
                  required: false
              }
          ]
          
          },
          execute(interaction){
            if (!interaction.member.permissions.has("KICK_MEMBERS")){
               return interaction.reply({ content: "Non hai il permesso per eseguire questo comando", ephemeral: true})
            }
            let utente = interaction.options.getUser("user")
            let reason = interaction.options.getString("reason") || "Nessun motivo"
    
            let member = interaction.guild.members.cache.get(utente.id)
            if (!member?.kickable){
                return interaction.reply({ content: "Non posso kiccare questo utente", ephemeral: true})
            }
            
            member.kick()
    
            let embeddkick = new Discord.MessageEmbed()
            .setTitle("Utente kiccato")
            .setThumbnail(utente.displayAvatarURL())
            .addField("User", utente.toString())
            .addField("Reason", reason)
    
            interaction.reply({ embeds: [embeddkick]})
    }
}
