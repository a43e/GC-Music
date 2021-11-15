const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!queue)
    return message.channel.send(
      ":x: Não há músicas tocando neste servidor"
    );

  queue.loop = !queue.loop;
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Controlador de Loop Mestre",
        "https://img.icons8.com/color/2x/refresh--v2.gif"
      )
      .setColor("ff7b00")
      .setTimestamp()
      .setDescription(
        "**Loop é" +
          (queue.loop == true ? " Enabled " : " Disabled ") +
        "para a música atual :white_check_mark: **"
      )
      .setFooter("Comando criado por LmDfps")
  );
};
