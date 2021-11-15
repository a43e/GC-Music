const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Não há músicas tocando neste servidor")
        .setColor("ff7b00")
    );
  queue.connection.dispatcher.end('pulada');
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Pulou a música :white_check_mark: **")
      .setColor("ff7b00")
  );
};
