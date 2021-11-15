const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Me convide",
        "https://img.icons8.com/ultraviolet/2x/email-open--v2.gif"
      )
      .setColor("ff7b00")
      .setTimestamp()
      .setDescription(
        "https://discord.com/oauth2/authorize?client_id=" +
          client.user.id +
          "&permissions=" +
          "37080128" +
          "&scope=" +
          "bot"
      )
      .setFooter("Comando criado por LmDfps")
  );
};
