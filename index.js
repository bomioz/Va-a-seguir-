require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const AgarioClient = require('./lib/agario-client');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.DISCORD_BOT_TOKEN;

client.once('ready', () => {
  console.log(`Bot listo como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.reply('Pong! 🏓');
  }

  else if (command === 'bots') {
    if (args.length < 3) {
      return message.reply('Uso correcto: `!bots <código_party> <región> <modo>`');
    }
    const [partyCode, region, mode] = args;

    // Número de bots a crear (28)
    const numBots = 28;

    message.reply(`Creando ${numBots} bots en party ${partyCode} región ${region} con modo ${mode}...`);

    for (let i = 0; i < numBots; i++) {
      try {
        const bot = new AgarioClient();

        bot.on('connected', () => {
          console.log(`Bot ${i+1} conectado a party ${partyCode} en región ${region}`);
          bot.joinParty(partyCode, region);

          if (mode === 'seguir') {
            bot.followPlayer('Bom.ioz'); // Cambia el nombre si quieres que sigan otro nick
          } else if (mode === 'burst') {
            // burst = seguir, dividir y alimentar
            bot.burstMode();
          } else {
            bot.feed();
          }
        });

        bot.connect();

      } catch (error) {
        console.error(`Error creando bot ${i+1}:`, error);
      }
    }
  }
});

client.login(TOKEN);
