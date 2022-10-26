global.Discord = require("discord.js");
global.client = new Discord.Client(
    {intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS", "GUILD_VOICE_STATES"], partials: ["CHANNEL", "MESSAGE", "REACTION"]} 
);
const { Client, Collection, VoiceState, MessageEmbed, MessageButton, MessageActionRow,  } = require("discord.js");
const { token } = require("./config.json");
client.voiceGenerator = new Collection();

client.login (token)

///////////////////////////////////////////////module export//////////////////////////////////////////////////
const fs = require("fs");
client.commands = new Discord.Collection()

const commandsFolder = fs.readdirSync("./commands");
for(const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for(const file of commandsFiles){
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}
////////////////////////////////////////events/////////////////////////////////////////////
const eventsFile = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventsFile) {
    const event =require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args))
}

//////////////////////////////////////slash command//////////////////////////////////

client.once('ready', () => {

    let servercommand = client.guilds.cache.get("1008476696095227964")

    client.guilds.cache.forEach(guild => {
        client.commands.forEach(command => {
            guild.commands.create(command.data)
        })
    })
  })

  client.on("interactionCreate", interaction =>{
    if(!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if(!command) return

    command.execute(interaction)
  })
///////////////////////////////////server in cui è dentro////////////////////////////////////////

client.on("messageCreate", message =>{
    if(message.content == "!sjoin"){
        if(!message.member.roles.cache.has("1012023594831855697")) return

        let list = client.guilds.cache.map(server => server.count).join(`\n`);

        var embedre = new Discord.MessageEmbed()
        .setDescription(list)
        message.channel.send({ embeds: [embedre] })
    }
})
//////////////////////////////////////////Temporaney channel//////////////////////////////////////////////////////////

client.on("voiceStateUpdate", async (oldState, newState) => {
    /**
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     */
     const { member, guild } = newState;
     const oldChannel = oldState.channel;
     const newChannel = newState.channel;
     const joinToCreate = "1030890516344225853"
     
     if (oldChannel !== newChannel && newChannel && newChannel.id === joinToCreate){
         const voiceChannel = await guild.channels.create(`Salottino di ${member.user.username}`, {
             type: "GUILD_VOICE",
             parent: newChannel.parent,
             permissionOverwrites: [
                 {id: member.id, allow: ["CONNECT", "MANAGE_CHANNELS"]},
                 {id: guild.id, deny: ["CONNECT", "MANAGE_CHANNELS"]},
                 {id: "1008789556901974077", allow: ["CONNECT"]}
             ]
         });
         client.voiceGenerator.set(member.id, voiceChannel.id);
         await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
         setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

         return setTimeout(() => member.voice.setChannel(voiceChannel), 500);
     }

     const owenedChannel = client.voiceGenerator.get(member.id)

     if(owenedChannel && oldChannel.id == owenedChannel && (!newChannel || newChannel.id !== owenedChannel)){
         client.voiceGenerator.set(member.id, null);
         oldChannel.delete().catch(() => {});
     }
})
///////////////////////////////////////////////////ticket//////////////////////////////////////////////

client.on("interactionCreate", async interaction => {
    if(interaction.isButton()) {
        if(interaction.customId === "primary"){
            const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")

            const canaleTicket = interaction.guild.channels.create(`Ticket di ${interaction.user.username}`, {
                type: "GUILD_TEXT",
                parent: "1012303197878108211",
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    }
                ]
            }).then(c => {
                const ticketAperto = new MessageEmbed()
                .setTitle("Ticket aperto")
                .setDescription(`Grazie per aver aperto un **ticket** <@${interaction.user.id}>,\nuno staffer ti aiuterà al più presto`)
                .setColor("ORANGE")

                c.send({embeds: [ticketAperto]})
            })

            interaction.reply({content: `<@${interaction.user.id}>, il tuo ticket è stato creato correttamente`, ephemeral: true})
        }
    }
    if(!interaction.isCommand()) return;

})