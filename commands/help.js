const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const commands = `connect\`\` - entre no canal de voz em que você está
   disconnect\`\` - saia do canal de voz em que está
   play <Nome da música ou url>\`\` - tocar músicas do youtube
   pause\`\` - pausar a reprodução das músicas no servidor
   resume\`\` - retomar músicas pausadas no servidor
   queue\`\` - mostra a fila de músicas do servidor
   skip\`\` - pula para a próxima música na fila
   skipto <Número alvo>\`\` - Múltiplos saltos até o alvo
   stop\`\` - para a música e limpa a fila
   volume <contagem de volume ou nenhum>\`\` - ver ou ajustar o volume das músicas
   np\`\` - veja agora tocando música
   lyrics\`\` - obter letras da música atual
   shuffle\`\` - embaralhe e randomize a fila
   invite\`\` - obter link de convite para o bot
   loop\`\` - ativar / desativar o loop para a música atualmente em reprodução
   remove <Número alvo>\`\` - remove uma música da fila
   help\`\` - para ver este comando`;

  const revised = commands
    .split("\n")
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join("\n");

  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Ajuda dos comandos do MusicBot",
        "https://img.icons8.com/color/2x/services--v2.gif"
      )
      .setColor("ff7b00")
      .setTimestamp()
      .setThumbnail('https://i.imgur.com/peO05Z1.png')
      .setImage("https://cdn.discordapp.com/attachments/900844440808206406/908936611801202758/MOSHED-2021-11-13-1-27-38.gif")
      .setFooter("Comando criado por LmDfps")
      .setDescription(revised)
  );
};
