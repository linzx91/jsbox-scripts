const ui = require("/scripts/ui");
const init = require("/scripts/init");

const [colors, toast, restore, getData, search] = [ui.colors, ui.toast, init.restore, init.getData, init.search];

const apps = [
  {
    title: "nPlayer",
    handler: (sender, indexPath) => player(indexPath, "nPlayer", "nplayer-")
  },
  {
    title: "APlayer",
    handler: (sender, indexPath) => player(indexPath, "APlayer", "alookplayer://")
  },
  {
    title: "PlayerXtreme",
    handler: (sender, indexPath) => player(indexPath, "PlayerXtreme", "playerxtreme://")
  },
  {
    title: "VLC 播放器",
    handler: (sender, indexPath) => player(indexPath, "VLC 播放器", "vlc://")
  }
];

const player = async (index, appName, scheme) => {
  const data = !$("view[3]").hidden ? await search($("input[0]").text) : !$("view[2]").hidden ? await getData(1, 0) : $cache.get("channels");
  const src = !$("view[1]").hidden && $cache.get("source").id !== "feed" ? restore(data[index.item].url) : data[index.item].url;
  const openApp = $app.openURL(scheme + src);
  await $wait(0.3);
  if (!openApp) toast($("window"), "xmark.circle.fill", colors[14], "无法打开 " + appName);
  $device.taptic(1);
  await $wait(0.15);
  $device.taptic(1);
};

const frameworks = ["AVFoundation", "AVKit"];
frameworks.forEach(name => $objc("NSBundle").$bundleWithPath(`/System/Library/Frameworks/${name}.framework`).$load());

const gravities = {
  resize: "AVLayerVideoGravityResize",
  resizeAspect: "AVLayerVideoGravityResizeAspect",
  resizeAspectFill: "AVLayerVideoGravityResizeAspectFill",
};

const play = (src, {
  showsPlaybackControls = true,
  videoGravity = "resizeAspect",
  allowsPictureInPicturePlayback = true,
  updatesNowPlayingInfoCenter = true,
  entersFullScreenWhenPlaybackBegins = false,
  exitsFullScreenWhenPlaybackEnds = false
} = {}) => {
  const url = $objc("NSURL").$URLWithString(src);
  const player = $objc("AVPlayer").$playerWithURL(url);
  player.$play();
  const playerVC = $objc("AVPlayerViewController").$new();
  playerVC.$setPlayer(player);
  playerVC.$setShowsPlaybackControls(showsPlaybackControls);
  playerVC.$setVideoGravity(gravities[videoGravity]);
  playerVC.$setAllowsPictureInPicturePlayback(allowsPictureInPicturePlayback);
  playerVC.$setUpdatesNowPlayingInfoCenter(updatesNowPlayingInfoCenter);
  playerVC.$setEntersFullScreenWhenPlaybackBegins(entersFullScreenWhenPlaybackBegins);
  playerVC.$setExitsFullScreenWhenPlaybackEnds(exitsFullScreenWhenPlaybackEnds);
  const rootVC = $ui.controller.ocValue();
  rootVC.$presentViewController_animated_completion(playerVC, true, null);
};

const options = {
  showsPlaybackControls: true,
  videoGravity: "resizeAspect",
  allowsPictureInPicturePlayback: true,
  updatesNowPlayingInfoCenter: true,
  entersFullScreenWhenPlaybackBegins: false,
  exitsFullScreenWhenPlaybackEnds: false
};

module.exports = {apps, play, options};