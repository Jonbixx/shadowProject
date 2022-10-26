const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ban",
    data: {
        name: "ban",
          description: "Banna un utente",
          options: [
              {
                  name: "user",
                  description: "Utente da bannare",
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
            if (!interaction.member.permissions.has("BAN_MEMBERS")){
               return interaction.reply({ content: "Non hai il permesso per eseguire questo comando", ephemeral: true})
            }
            let utente = interaction.options.getUser("user")
            let reason = interaction.options.getString("reason") || "Nessun motivo"
    
            let member = interaction.guild.members.cache.get(utente.id)
            if (!member?.kickable){
                return interaction.reply({ content: "Non posso bannare questo utente", ephemeral: true})
            }
            
            member.ban()
    
            let embedban = new Discord.MessageEmbed()
            .setTitle("Utente bannato")
            .setColor("DARK_PURPLE")
            .setThumbnail(utente.displayAvatarURL())
            .addField("User", utente.toString())
            .addField("Reason", reason)
    
            interaction.reply({ embeds: [embedban]})
    }
}
