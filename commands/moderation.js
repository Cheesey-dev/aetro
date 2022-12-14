const Discord = require('discord.js');
const {MessageActionRow, MessageButton} = require("discord.js") 
const db = require('croxydb') 

module.exports = {
  en: {
    name: "moderation", 
    options: [], 
    description: "⚒️ It allows you to use authorized commands.",
  },
    run: async (client, interaction) => {
await interaction.deferReply()
if(!interaction.member.permissions.has('ADMINISTRATOR')){
            return interaction.reply({
                content: `${await client.emoji.fetch(`no`)} You must have permissions to administrator to moderation commands..`,
                ephemeral: true
            });
        }

const embed = new Discord.MessageEmbed()
.setTitle(`⚒️ Moderation commands`)
.setDescription(`Select the command you want to use below.`) 

const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('welcome_goodbye')
                .setLabel("Welcome - GoodBye")
                .setStyle("PRIMARY")
                .setEmoji(""), 
            new MessageButton()
                .setCustomId('')
                .setLabel("")
                .setStyle("PRIMARY")
                .setEmoji(""),
)

const message = await interaction.channel.send({embeds: [embed], components: [row]})

await client.moderation.set(`moderation_user_${message.id}`, `${interaction.user.id}`)

    setTimeout(async () => {
await client.moderation.delete(`moderation_user_${message.id}`)
message.delete()
}, 300000)

} 
}
