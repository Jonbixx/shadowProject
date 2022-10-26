module.exports = {
    name: "ready",
    execute(client){
        client.user.setActivity("Jonbix", {
            type: "WATCHING"
        })
      console.log("Bot online")
    }
}