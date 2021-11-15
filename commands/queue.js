const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );
  const queue = message.client.queue.get(message.guild.id);
  var status;
  var np;
  var count = 0;
  if (!queue) status = "Não há nada na fila!";
  else
    status = queue.queue
      .map((x) => {
        count += 1;
        return (
          "• " +
          "`" +
          count +
          "." +
          "`" +
          x.name +
          " -Requerido por " +
          `<@${x.requested.id}>`
        );
      })
      .join("\n");
  if (!queue) np = status;
  else np = queue.queue[0].name;
  if (queue) thumbnail = queue.queue[0].thumbnail;
  else thumbnail = message.guild.iconURL();
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Fila de música",
        "https://img.icons8.com/color/2x/rhombus-loader.gif"
      )
      .setThumbnail(thumbnail)
      .setColor("ff7b00")
      .addField("Tocando agora", np, true)
      .setDescription(status)
  );
};
