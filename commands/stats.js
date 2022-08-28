const Discord = require('discord.js');
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js") 
const db = require('croxydb') 
const moment = require('moment')
const os = require('os')

module.exports = {
  en: {
    name: "stats", 
    options: [], 
    description: "ℹ️ Shows the bot\'s statistics.",
  },
    run: async (client, interaction) => {

   const row = new MessageActionRow() 
.addComponents(
new MessageButton() 
.setStyle('LINK')
.setLabel('Web Site')
.setEmoji('🌐')
.setURL('https://spacegw.xyz/')
) 

const Teyit = await client.komut.all().filter(data => data.ID.startsWith(`komut_`)).sort((a, b) => b.data - a.data)
        Teyit.length = 1
        let FinalDB = ""
        for (var i in Teyit) {
          FinalDB += `\`/${Teyit[i].ID.slice(6)}\` (\`${Teyit[i].data}\` Usage)`
        }

		const guildd = client.guilds.cache.size
const userr = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
const embed = new Discord.MessageEmbed()
    .setColor("RANDOM") 
    .setAuthor("Space Giveaway Info") 
.setDescription(`**• General Statistics**
<:server_req:973476419214643260> Total servers: **${guildd}**
<:wumpus_sgs:973476021552693288> Total Users: **${userr}**
**• Server Information**
🏓 Ping: **${client.ws.ping}**
**• Versions**
<:discord_javascript:973484720287518721> Discord.js Version: **${Discord.version}**
<:node:973476585342652417> Node.js Version: **16.13.2**
<:kitap:973487096889217024> Bot Version: **1.8.3**
**• Bot Statistics**
💾 Memory Usage: **${(process.memoryUsage().heapUsed / 2024 / 2024).toFixed(2)} / 8 GB**
**• Command Statistics**
💻 Total Commands: **${client.commands.size}**
💻 Most used command: **${FinalDB.replace('undefined','Unknown command.')}**
<:sgs_slash:973476174762217482> Total Command Usage: **${db.fetch(`bot_using`)}**`)  
.setTimestamp() 
interaction.reply({ embeds: [embed], components: [row]}) 

} 
}
