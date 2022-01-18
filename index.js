#! /usr/bin/env node

const fs = require("fs");

(async () => {
  let dir = process.cwd()
  fs.writeFileSync(
    dir + "/index.js",
    `const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const beeptools = require("beeptools")
beeptools.KeepAlive()
client.on('ready', async () => {
  console.log("im in :)")
});
client.on("guildCreate", guild => {
  beeptools.RegisterSlash(process.env.TOKEN, guild.id, client.application.id, __dirname + "/commands")
});

client.on('interactionCreate', async interaction => {
  client.guilds.cache.forEach(guild => {
    beeptools.RegisterSlash(process.env.TOKEN, guild.id, client.application.id, __dirname + "/commands")
  });
  if (interaction.isCommand()) {
    var cmd = require(__dirname + '/commands/' + interaction.commandName + '.js').run;
    cmd(interaction);
  };
});

client.login(process.env.TOKEN)`+'\n'
  );
  const commandsDir = dir+"/"+"commands";
  fs.mkdirSync(commandsDir);
  fs.writeFileSync(
    commandsDir + "/help.js",
    `const { Builders } = require("beeptools")
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

async function help(inter) {
  const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help!')
	.setDescription('Automatically created :)')
	.setTimestamp()
  await inter.reply({embeds:[exampleEmbed]})
}

const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Help!')
command = {
  meta:data,
  run:help
}
module.exports = command
`
  );
  console.log("\x1b[34m%s", "Bot created\x1b[0m");
})();
