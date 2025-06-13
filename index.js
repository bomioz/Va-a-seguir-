const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Bot listo! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === '!ping') {
    message.channel.send('Pong!');
  } else if (command === '!bots') {
    if (args.length < 2) {
      message.channel.send('Uso correcto: `!bots <código_party> <región> <modo>`');
      return;
    }
    // Aquí más adelante irán tus instrucciones para crear los bots.
    message.channel.send(`Comando bots recibido: party=${args[0]}, región=${args[1]}, modo=${args[2] || 'default'}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
