//made by Cloudflare during a hot day nothing to write here
// Load up the discord.js library
const Discord = require("discord.js");

/*
 DISCORD.JS VERSION 12 CODE
*/


//UPDATES



const nuds = "*"
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
const path = require("path");
const fs = require("fs");
// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
//https://discordapp.com/api/webhooks/749601400048189531/7oeNzcGYilGGdp71cj6pJtbmNRwqK5M1nfeyYdvnLS3tBn-MIaOYb-pEmPH_3ejvP3ME
const hook = require("./hook");

//chathook : https://discordapp.com/api/webhooks/749854285969227862/xKKtKR2EElWraQ_2Rj6k7qcgiJUWgsyUl8x2bWFQIheGYFFfjee_KX6U4C6Yj2k7qVpZ
const chook = new Discord.WebhookClient('749854285969227862', 'xKKtKR2EElWraQ_2Rj6k7qcgiJUWgsyUl8x2bWFQIheGYFFfjee_KX6U4C6Yj2k7qVpZ');
// the webhooks in the index
const orderhook = new Discord.WebhookClient('749601400048189531', '7oeNzcGYilGGdp71cj6pJtbmNRwqK5M1nfeyYdvnLS3tBn-MIaOYb-pEmPH_3ejvP3ME');
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Clucks!! c.help`, {type: 'WATCHING'});
  client.generateInvite(["ADMINISTRATOR"]).then(link => {
  console.log("\nInvite:\n" + link);
  const time = Date.now()
  chook.send(`Bot has started at ${time}, Ping: ${client.ws.ping}ms Uptime: ${client.uptime}ms Watching ${client.users.cache.size} users, ${client.channels.cache.size} channels and ${client.guilds.cache.size} guilds/servers.`);
  chook.send('\n**Notes:**\n' + nuds)
  });
});

client.on("disconnect", () => {
    console.log(`Bot has disconnected`)
    chook.send(`Bot has disconnect at ${time}!`)
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);

});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
    
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if(message.author.bot) return;
    
    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if(!message.content.startsWith(config.prefix)) return;
    
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    // Let's go with a few common example commands! Feel free to delete or change those.
    if(command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        message.channel.send(`Pong! (${Math.round(client.ws.ping)}ms) -at ${message.createdTimestamp}!`);
        message.react('👀')
    };
    
    if(command === "members") {
        //send members in the server
        message.react('👀')
        message.channel.send(`${message.author}, There are total ${message.guild.memberCount} members`)
    };

    if(command === "help") {
        //test help cmd
        message.channel.send(`not yet cloudflare is sleepy slop`)
        message.react('👀')
    };

    if(command === "membercount") {
        message.react('👀')
        //count v2
        message.channel.send(`There are ${client.users.cache.size} members in this server, including ${message.guild.bot.size} bots and ${message.guild.members.size} members!`)
    };

    if(command === "hello") {
        message.react('👀')
        message.channel.send("hello!")
    };

    if(command === "test") {
        message.react('👀')
        message.channel.send("I'm working!")
    };

    if(command === "uptime") {
        message.react('👀')
        message.channel.send(`Uptime: ${client.uptime}`)
    };

    const orders = 0;
    if(command === "order") {
        if (message.channel.id === '749585800617787453') {
        //order cmd
        const oitem = args.join(" ");
        const oemb = new Discord.MessageEmbed()
        .setTitle('New Order')
        .setAuthor(`${message.author.tag} (${message.author.id})`)
        .setDescription(oitem)
        .setFooter(`Requested at ${message.createdAt}`);
        //if(args === "0") {return message.channel.send("You need the have something to order");}
        const olc = message.guild.channels.cache.find(ch => ch.name === 'order-log');
        olc.send(`<@749612140297584680> New order by ${message.author}`);
        olc.send(oemb)
        message.channel.send(`${message.author}, Your order has been requested!`);
        message.react('👀');
        
        } 
        if(message.channel.id !== "749585800617787453") {message.channel.send(`${message.author}, you can only order at <#749585800617787453>!`);};
        
    };

    if(command === "menu") {
        const memb = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("📒Menu📒")
        .setDescription("📒Last Updated: 8/31 18:10")
        .setThumbnail('https://cdn.discordapp.com/avatars/749590052463444048/29f2b3a7c85ebe56afa4df13272fda15.png')
        .addField('📒Popular', '\nCluck Bucket\n \nMega Cluck Bucket\n \nCluck Fries S,M,L\n \nVegan Burger\n \nCluckles Delight Jumbo Burger\n \nCluckles Meat Burger\n \nDeath Ray Burned Spicy Hot Burger\n \nMeat Sandwhich S,M,L\n', true)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: '📒Pies', value: 'Oxford Pie', inline: true },
            { name: '📒Burger', value: 'Cluckles/DuT supreme burger', inline: true },
            { name: '📒Pizza', value: 'Cloud/Oxford Supreme pizza', inline: true },
            { name: '📒Buckets', value: '\nCluck Bucket\n \nChili sauce cluck Bucket\n \nCluckle Donald Trump Special Burger\n', inline: true },
        )
        .setTimestamp()
        .setFooter('Menu of Cluck Donald\'s, More coming soon', 'https://cdn.discordapp.com/avatars/749590052463444048/29f2b3a7c85ebe56afa4df13272fda15.png');
        message.react('👀');
        message.channel.send(memb);
        message.channel.send('There is a channel for the menu <#749585270046720021>')
    };

    if(command === "menuchannel") {
        message.react('👀');
        message.channel.send("<#749585270046720021>")
    };

    if(command === "server") {
    
        const ssemb = new Discord.MessageEmbed()
        .setTitle('Server Overview')
        .setDescription(`${message.guild.name} (ID:${message.guild.id})`)
        .setThumbnail(`${message.guild.iconURL}`)
        .setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
        .addFields(
        { name: 'Owner', value: `${message.guild.owner.tag}`, inline: true },
        { name: 'ID', value: `${message.guild.id}`, inline: true },
        { name: 'Region', value: `${message.guild.region}`, inline: true },
        { name: 'Created', value: `${message.guild.createdAt}`, inline: true },
        { name: 'Members', value: `${client.users.cache.size}`, inline: true },
        { name: 'Large', value: `${message.guild.large}`, inline: true },
        { name: 'Verify Level', value: `${message.guild.verificationLevel}`, inline: true },
        { name: 'All Channels', value: `${message.guild.channels.size}`, inline: true },
        { name: 'Role', value: `${message.guild.roles.size}`, inline: true },
        { name: 'Emojis', value: `${message.guild.emojis.size}`, inline: true },
        { name: 'Voice Region', value: `${message.guild.fetchVoiceRegions}`, inline: true },
        { name: 'Server Icon', value: `[Click Here](${message.guild.iconURL})`, inline: true },
        )
        .setTimestamp()
        .setFooter(`Server Overview for ${message.guild.name}`);

        message.channel.send(ssemb);
        message.react('👀');
    };

    if(command === 'avatar') {
        message.react('👀')
        if (args[0]) {
            const auser = getUserFromMention(args[0]);
            
    
            return message.channel.send(`${auser.username}'s avatar: ${auser.displayAvatarURL({ dynamic: true })}`);
        }
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
    };

    if(message.content == "<@749590052463444048>") {
        message.channel.send(`${message.author}, My prefix is "c." Usage: c.help `)
    };

    if(message.content == "@Cloudflare#8151") {
        message.channel.send(`${message.author}, yes`)
    };

    if(message.content == "<@428437981238657025>") {
        message.channel.send(`${message.author}, yes `)
    };


});

client.login(process.env.token);
