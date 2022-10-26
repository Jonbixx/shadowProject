const { CommandInteraction, MessageSelectMenu, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = {
    name: "help",
    data: {
        name: "help",
        description: "Lista dei comandi è funzionalita del bot"
    },
    /** 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction){
        const embedcomandi = new MessageEmbed()
        .setTitle("Lista comandi")
        .setColor("ORANGE")
        .setDescription("Lista completa dei comandi disponibili del bot")
        .addField("🎡Comandi Generali", "`/echo`, rimanda il messaggio\n`/suggest`, per creare un suggerimento\n`/ping`, ping del bot\n`/echodm`, manda il messaggio scritto in privato all\'utente selezionato\n`/embed`, crea il tuo embed", true)
        .addField("🔨Comandi Moderazione", "`/ban`, per banare un utente dal server\n`/kick`, per kiccare un utente dal server\n`/clear`, per eliminare dei messaggi", true)
        .addField("🚀Funzionalita Extra", "`elimina link`, per eliminare i link(Tranne chi ha permesso di Amministratore)", true)

        interaction.reply({embeds: [embedcomandi]})
   }
}
