const ytdl = require("discord-ytdl-core");
const youtubeScraper = require("yt-search");
const yt = require("ytdl-core");
const { MessageEmbed, Util } = require("discord.js");
const forHumans = require("../utils/forhumans.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;

  const error = (err) => message.channel.send(err);
  const send = (content) => message.channel.send(content);
  const setqueue = (id, obj) => message.client.queue.set(id, obj);
  const deletequeue = (id) => message.client.queue.delete(id);
  var song;

  if (!channel) return error("Você deve entrar em um canal de voz para tocar música!");

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("Eu não tenho permissão para entrar no canal de voz");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("Eu não tenho permissão para falar no canal de voz");

  const query = args.join(" ");

  if (!query) return error("Você não forneceu um nome de música para tocar!");

  if (query.includes("www.youtube.com")) {
    try {
      const ytdata = await await yt.getBasicInfo(query);
      if (!ytdata) return error("Nenhuma música encontrada para o url fornecido");
      song = {
        name: Util.escapeMarkdown(ytdata.videoDetails.title),
        thumbnail:
          ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url,
        requested: message.author,
        videoId: ytdata.videoDetails.videoId,
        duration: forHumans(ytdata.videoDetails.lengthSeconds),
        url: ytdata.videoDetails.video_url,
        views: ytdata.videoDetails.viewCount,
      };
    } catch (e) {
      console.log(e);
      return error("Ocorreu um erro, verifique o console");
    }
  } else {
    try {
      const fetched = await (await youtubeScraper(query)).videos;
      if (fetched.length === 0 || !fetched)
        return error("Não consegui encontrar a música que você pediu!'");
      const data = fetched[0];
      song = {
        name: Util.escapeMarkdown(data.title),
        thumbnail: data.image,
        requested: message.author,
        videoId: data.videoId,
        duration: data.duration.toString(),
        url: data.url,
        views: data.views,
      };
    } catch (err) {
      console.log(err);
      return error("Ocorreu um erro, verifique o console");
    }
  }

  var list = message.client.queue.get(message.guild.id);

  if (list) {
    list.queue.push(song);
    return send(
      new MessageEmbed()
        .setAuthor(
          "A música foi adicionada à fila",
          "https://img.icons8.com/color/2x/cd--v3.gif"
        )
        .setColor("ff7b00")
        .setThumbnail(song.thumbnail)
        .addField("Nome da música", song.name, false)
        .addField("Visualizações", song.views, false)
        .addField("Duração", song.duration, false)
        .addField("Requerido por", song.requested.tag, false)
        .setFooter("Posicionada " + list.queue.length + " Na fila")
    );
  }

  const structure = {
    channel: message.channel,
    vc: channel,
    volume: 85,
    playing: true,
    queue: [],
    connection: null,
  };

  setqueue(message.guild.id, structure);
  structure.queue.push(song);

  try {
    const join = await channel.join();
    structure.connection = join;
    play(structure.queue[0]);
  } catch (e) {
    console.log(e);
    deletequeue(message.guild.id);
    return error("Não consegui entrar no canal de voz, verifique o console");
  }

  async function play(track) {
    try {
      const data = message.client.queue.get(message.guild.id);
      if (!track) {
        data.channel.send("A fila está vazia, saindo do canal de voz");
        message.guild.me.voice.channel.leave();
        return deletequeue(message.guild.id);
      }
      data.connection.on("disconnect", () => deletequeue(message.guild.id));
      const source = await ytdl(track.url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
        opusEncoded: true,
      });
      const player = data.connection
        .play(source, { type: "opus" })
        .on("finish", () => {
          var removed = data.queue.shift();
          if(data.loop == true){
            data.queue.push(removed)
          }
          play(data.queue[0]);
        });
      player.setVolumeLogarithmic(data.volume / 100);
      data.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Começou a Tocar",
            "https://img.icons8.com/color/2x/cd--v3.gif"
          )
          .setColor("ff7b00")
          .setThumbnail(track.thumbnail)
          .addField("Nome da música", track.name, false)
          .addField("Visualizações", track.views, false)
          .addField("Duração", track.duration, false)
          .addField("Requerido por", track.requested, false)
          .setFooter("Youtube Music Player")
      );
    } catch (e) {
      console.error(e);
    }
  }
};
