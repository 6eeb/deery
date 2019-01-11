const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection()


fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile <= 0){
        console.log("Commands not found.");
        return;
    };

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

function changing_status() {
    let status = [`${bot.users.size} Users!`, 'https://discord.gg/uDJABhF', ';help', `${bot.guilds.size} Servers!`]
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random)
}

bot.on("ready", () => {
    console.log("Deery is ready!");
    setInterval(changing_status, 3000);
})


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = botconfig.prefix

    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    if(message.content.indexOf(prefix) !== 0) return;

});

const YTDL = require("ytdl-core");
const client = new Discord.Client();

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly"
    }));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });

}
var servers = {};
var prefix = ';';
client.on("message", async message => {
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    switch (args[0].toLowerCase()) {
        case "mplay":
            if (!message.guild.member(client.user).hasPermission('SPEAK')) return message.channel.send('**Sorry, but i cant join/speak in this channel!**').catch(console.error);
            if (!args[1]) {
                message.channel.send("**Please provide a URL YouTube link to me to play song.**");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (console.error) {
                message.channel.send("**Sorry, but i cant search videos in YouTube! Provide a link to play!**");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            message.channel.sendMessage('``You song has been added to the queue.``')
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "mstop":
            var server = servers[message.guild.id];
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.send('``The queue of songs removed.``');
            break;
        case "mskip":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.send('``The song has been sucessfully skipped.``');
            break;
        case "mpause":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.pause();
            message.channel.send('``The song is paused.``');
            break;
        case "mresume":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.resume();
            message.channel.send('``The song is sucessfully continued.``');
            break;
    }
});

module.exports = (client, member, message) => {
    const welcomeChannel = member.guild.channels.find('name', '✰join-and-leave');
    if (welcomeChannel) {
       let WelcomeEmbed = new Discord.RichEmbed()
      .setTitle("Member has joined!")
      .setThumbnail(member.user.displayAvatarURL)
      .setDescription(`Welcome ${member.user} to ${member.guild.name}, \nPlease follow the rules \n and I hope you enjoy your stay here!`)
      .setColor("#4286f4")
      .setFooter(`You are the ${member.guild.memberCount} member to joined.`)
      .setTimestamp();
      welcomeChannel.send(WelcomeEmbed)
    } 
  }

bot.login(process.env.BOT_TOKEN);
