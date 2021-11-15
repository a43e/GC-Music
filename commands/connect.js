const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("Eu não tenho permissão para entrar no canal de voz");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("Eu não tenho permissão para falar no canal de voz");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Entrou no canal de voz :white_check_mark: **")
      .setColor("BLUE")
  );
};
