module.exports = {
    name: "messageCreate",
    execute(message){
        if (message.member.permissions.has("ADMINISTRATOR")) return

    let link = ["https"]
    let trovata2 = false;
    link.forEach(parola2 =>{
        if(message.content.includes(parola2)){
            trovata2 = true;
        }
    })
    if(trovata2){
        message.delete();
        let embedlink = new Discord.MessageEmbed()
        .setTitle("Hai mandato un link")
        .setDescription(`Hai inviato un link, non **farlo** più`)
        .setColor("GREEN")
        message.channel.send({embeds: [embedlink]})
    }
    }
}