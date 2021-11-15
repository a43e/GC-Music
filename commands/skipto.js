const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
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
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Você deve especificar o número para pular** :x:")
        .setColor("ff7b00")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**O valor deve ser um número** :x:")
        .setColor("ff7b00")
    );
  queue.playing = !false;

  if (queue.loop) {
    for (let i = 0; i < parseInt(args[0]) - (1 + 1); i++) {
      var delta = queue.queue.shift();
      queue.queue.push(delta);
    }
  } else {
    queue.queue = queue.queue.slice(parseInt(args[0]) - (1 + 1));
  }

  try {
    queue.connection.dispatcher.end();
  } catch (e) {
    console.log(e);
    message.client.queue.delete(message.guild.id);
    queue.vc.leave();
  }

  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**Pulei a música para" +
          " `" +
          args[0] +
          "` " +
          ":white_check_mark:**"
      )
      .setColor("ff7b00")
  );
};
