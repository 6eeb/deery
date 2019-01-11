const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {

    message.channel.send("You can invite me to your server here: https://discordapp.com/oauth2/authorize?client_id=532975608263868438&scope=bot&permissions=8");

}

module.exports.help = {
    name: "invite"
}