module.exports = {
    name: "echo",
    data: {
        name: "echo",
        description: "Risponde con il tuo messaggio",
        options: [
            {
                name: "text",
                description: "Inserisci un testo",
                type: "STRING",
                required: true
            }
        ]
    },
    async execute(interaction){
        const Text = interaction.options.getString("text")

        await interaction.reply(Text)
    }
}