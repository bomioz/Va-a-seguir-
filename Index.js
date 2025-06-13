require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const startBots = require('./lib/startBots');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === '!ping') {
    return message.reply('🏓 Pong!');
  }

  if (command === '!bots') {
    if (args.length < 3) {
      return message.reply('❌ Uso correcto: `!bots <código_party> <región> <modo>`');
    }

    const [partyCode, region, mode] = args;

    try {
      await startBots(partyCode, region, mode);
      message.reply(`🟢 ¡Enviando bots a la party \`${partyCode}\` en la región \`${region}\` con modo \`${mode}\`!`);
    } catch (err) {
      console.error(err);
      message.reply('⚠️ Hubo un error al iniciar los bots.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
