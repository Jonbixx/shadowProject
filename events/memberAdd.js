module.exports = {
    name: "guildMemberAdd",
    execute(member){
        if(member.guild.id !== "1008476696095227964") return;
        let benvMess = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Benvenuto nel server <@${member.id}>, sei il ${member.guild.memberCount}° membro`)

    client.channels.cache.get("1008522094998462504").send({ embeds: [benvMess]})

    // auto ruolo
    const ruolo = member.guild.roles.cache.find(r => r.name === "MEMBRO");
    member.roles.add(ruolo);
    }
}