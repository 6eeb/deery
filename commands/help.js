const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {

    message.channel.send("I have sent help to your Dm's! :smile: ");

    message.author.send("```Help\n" + 
    ";help  sends this message.\n" +
    ";votekick  starts a vote to kick a user.\n" +
    ";userinfo  shows info about a user.\n" +
    ";serverinfo  shows info about the current server.\n" + 
    ";kick @user  kicks a user that you mention.\n" +
    ";ban @user  bans a user that you mention.\n" +
    ";invmake  makes an invite for this server.\n" +
    ";invite  sends you the invite for the bot.\n" + 
    ";servers  shows what servers the bot is in.\n" +
    ";report @user <reason>  sends a report for a user.\n" +
    ";tempmute @user <time in minutes> mutes a user.\n" +
    ";hug @user  hugs a user.\n" +
    ";kiss @user  kisses a user.\n" +
    ";cuddle @user  cuddles a user.\n" +
    ";slap @user  slaps a user.\n" +
    ";punch @user  punches a user.\n" +
    ";hastebin <text> Makes a hastebin link with your text/code.\n" +
    ";remindme <s/m/h/d> <reminder>  reminds you.\n" +
    ";quiz  quizes you.\n" +
    ";weather <location>  tells you the weather.\n" +
    ";ascii <text>  makes an ascii.\n" +
    "More commands comming soon.```")
}

module.exports.help = {
    name: "help"
}