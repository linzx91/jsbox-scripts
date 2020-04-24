const ui = require("/scripts/ui");

const [colors, themeColor, Spinner, toast, lottie] = [ui.colors, ui.themeColor, ui.Spinner, ui.toast, ui.lottie];

const restore = code => {
  code = $text.base64Decode(code);
  let data = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    data += String.fromCharCode(code.charCodeAt(i) - data.charCodeAt(i - 1));
  }
  return data;
};

const href = pathname => restore("wpDDnMOow6TDo8KtaV7CqMOuw6PCm15jZ25tam5qanBmwpTDj8OVw5HCk8Kbw6bDqsOUw4/Dm8Okw5nCksKRw5LDnA==") + pathname;

if (!$cache.get("source")) $cache.set("source", {id: "live", url: href("/jsbox/tvbox/live.json")});

const getData = async (object, value, url) => {
  const source = $cache.get("source");
  const isNumber = typeof object === "number";
  !isNumber ? (url = object, value = 0, object = 0) : url = url ? url : source.url;
  let title = $text.URLDecode(url.replace(/(^.+\/)|(\.(m3u|json|txt)$)/ig, "")), data = null;
  if (object === 0) {
    const resp = await $http.request({
      method: "GET",
      url: url,
      timeout: 15
    });
    try {
      const isString = typeof resp.data === "string";
      const isObject = typeof resp.data === "object";
      const isM3UFormat = new RegExp(/https?:\/\/.+\.m3u$/i).test(url) && new RegExp(/(#EXTM3U[\s\S]*?)#EXTINF/g).test(resp.data);
      const isTxtFormat = new RegExp(/https?:\/\/.+\.txt$/i).test(url) && new RegExp(/.+,(\s+)?https?:\/\//i).test(resp.data);
      const cycle = (name, url, array = []) => {
        name.forEach((name, index) => {
          url.forEach((url, tindex) => {
            if (index === tindex) {
              const object = {
                name: name,
                url: url
              };
              array.push(object);
            }
          });
        });
        return array.length ? array : null;
      };
      if (isString && isM3UFormat) {
        const array = resp.data.replace(/^([\s\S]*?)(?=#EXTINF)|#EXTINF.+,(\s+)?|#EXTVLCOPT.+\n|(\s|\r)+(?=(\n|$))/ig, "").split("\n");
        const name = [];
        const url = [];
        array.forEach((item, index) => index % 2 === 0 ? name.push(item) : url.push(item));
        data = cycle(name, url);
      } else if (isString && isTxtFormat) {
        const name = resp.data.match(/[^\s].+?(?=(\s+)?,(\s+)?https?:\/\/)/ig);
        const url = resp.data.match(/[^,\s]?https?:\/\/.+[^\s]/ig);
        data = cycle(name, url);
      } else if (isObject && resp.data[(0, resp.data.length - 1)].hasOwnProperty("name", "url")) {
        data = resp.data;
      }
    } catch (err) {
      const includeChannel = resp.data.hasOwnProperty("channel") || resp.data.hasOwnProperty("channels");
      const channels = resp.data.channel || resp.data.channels;
      const includeTitle = resp.data.hasOwnProperty("title") || resp.data.hasOwnProperty("name");
      if (includeChannel && channels[(0, channels.length - 1)].hasOwnProperty("name", "url")) data = channels.map(item => {return {name: item.name, url: item.url}});
      if (includeTitle) title = resp.data.title || resp.data.name;
    }
    if (resp.error) {
      const message = resp.error.localizedDescription.replace(/。+$/, "");
      const info = message.includes("kCFErrorDomainCFNetwork") ? "网络出错，请稍后再试" : message;
      toast($("window"), "xmark.circle.fill", colors[14], info);
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
    } else if (!data) {
      const statusCode = resp.response.statusCode;
      toast($("window"), "xmark.circle.fill", colors[14], !isNumber && statusCode === 200 ? "订阅文件错误" : statusCode === 403 ? statusCode + " 没有访问权限" : statusCode === 404 ? statusCode + " 订阅地址无效" : statusCode >= 500 && statusCode <= 505 ? statusCode + " 服务器出错，请稍后再试" : statusCode + " 无法获取数据");
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
    } else if (isNumber) {
      $cache.set("channels", data);
      toast($("window"), "checkmark.circle.fill", colors[26], `目前一共收录了 ${data.length} ${source.id === "live" ? "个直播源" : "部影片"}`);
    }
  } else if (object === 1) {
    data = $file.exists("shared://tvbox/favorites.json") ? JSON.parse($file.read("shared://tvbox/favorites.json").string) : [];
    if (!data.length) $file.delete("shared://tvbox/favorites.json");
    $("label[1]").hidden = !data.length ? false : true;
  } else if (object === 2) {
    data = $file.exists("shared://tvbox/feeds.json") ? JSON.parse($file.read("shared://tvbox/feeds.json").string) : [];
    if (!data.length) $file.delete("shared://tvbox/feeds.json");
    $("label[2]").hidden = !data.length ? false : true;
  }
  return value === 0 ? data : value === 1 && data ? data.map(item => object === 2 && source.id === "feed" ? {label: {text: item.name}, mark: {hidden: item.url !== source.url ? true : false}} : {label: {text: item.name}}) : {title: title, data: data};
};

const getFeedData = async (object, index, url) => {
  const data = index === undefined ? $cache.get("channels") : JSON.parse($file.read("shared://tvbox/feeds.json").string)[index].data ? JSON.parse($file.read("shared://tvbox/feeds.json").string)[index].data : await getData(url);
  return object === 0 ? data : data.map(item => {return {label: {text: item.name}}});
};

const search = async value => {
  const data = !$("view[0]").hidden ? $cache.get("channels") : await getData(1, 0);
  const reg = new RegExp(/((^\s*)|(\s*$))|(\s|-|_|\||\(|\)|\[|\])+/g);
  value = value.toUpperCase().replace(reg, "");
  if (!value) return !$("view[2]").hidden ? [] : -1;
  return !$("view[2]").hidden ? data.filter(item => item.name.toUpperCase().replace(reg, "").includes(value)) : data.findIndex(item => item.name.toUpperCase().replace(reg, "").includes(value));
};

const setFeed = async (data = []) => {
  data[0] = await getData(2, 0);
  const inputValue = $("input[1]").text.replace(/(^\s*)|(\s*$)/g, "");
  const isFeedLink = new RegExp(/^https?:\/\/.+\.(m3u|json|txt)$/).test(inputValue);
  if (isFeedLink) {
    $("input[1]").blur();
    $("blur[9]").relayout();
    $("blur[9]").updateLayout((make, view) => make.center.equalTo(view.super));
    $ui.animate({
      duration: 0.3,
      animation: () => $("blur[9]").relayout()
    });
    $ui.animate({
      duration: 0.3,
      animation: () => $("view[4]").alpha = 0,
      completion: async () => {
        $("view[4]").hidden = true;
        $app.autoKeyboardEnabled = false;
      }
    });
    if (data[0].some(item => item.url === inputValue)) {
      lottie("exclamation");
      await $wait(0.3);
      toast($("window"), "exclamationmark.circle.fill", colors[22], "该订阅地址已存在");
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
      return;
    }
  } else if (!inputValue) {
    toast($("window"), "exclamationmark.circle.fill", colors[14], "订阅地址不能为空");
    $("input[1]").text = "";
    $device.taptic(1);
    await $wait(0.15);
    $device.taptic(1);
    return;
  } else {
    toast($("window"), "xmark.circle.fill", colors[14], "你输入的地址错误");
    $device.taptic(1);
    await $wait(0.15);
    $device.taptic(1);
    return;
  }
  const spinner = new Spinner();
  spinner.start();
  data[2] = await getData(0, 2, inputValue);
  if (data[2].data) {
    data[1] = {name: data[2].title, url: inputValue, data: data[2].data};
    if (!$file.exists("shared://tvbox")) $file.mkdir("shared://tvbox");
    if (!$file.exists("shared://tvbox/feeds.json")) {
      $file.write({
        data: $data({
          string: JSON.stringify([data[1]])
        }),
        path: "shared://tvbox/feeds.json"
      });
    } else {
      data[0].unshift(data[1]);
      $file.write({
        data: $data({
          string: JSON.stringify(data[0])
        }),
        path: "shared://tvbox/feeds.json"
      });
    }
  }
  spinner.stop();
  lottie(data[2].data ? "checkmark" : "xmark");
  if (data[2].data) toast($("window"), "checkmark.circle.fill", colors[26], `该订阅一共收录了 ${data[2].data.length} 个播放源`);
  $("list[0]").data = await getData(2, 1);
};

const editFeed = {
  data: {},
  async handler() {
    const inputValue = $("input[2]").text.replace(/(^\s*)|(\s*$)/g, "");
    if (!inputValue) {
      toast($("window"), "exclamationmark.circle.fill", colors[14], "订阅名称不能为空");
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
    } else {
      let data = await getData(2, 0);
      const object = {
        name: $("input[2]").text,
        url: this.data.url,
        data: this.data.data
      };
      data.splice(this.data.index, 1, object);
      $file.write({
        data: $data({
          string: JSON.stringify(data)
        }),
        path: "shared://tvbox/feeds.json"
      });
      lottie("checkmark");
      $("input[2]").blur();
      $("blur[10]").relayout();
      $("blur[10]").updateLayout((make, view) => make.center.equalTo(view.super));
      $ui.animate({
        duration: 0.3,
        animation: () => $("blur[10]").relayout()
      });
      $ui.animate({
        duration: 0.3,
        animation: () => $("view[5]").alpha = 0,
        completion: async () => {
          $("list[0]").data = await getData(2, 1);
          $("view[5]").hidden = true;
          $app.autoKeyboardEnabled = false;
        }
      });
    }
  }
};

const feedViewControl = (sender, offset) => {
  const contentHeight = sender.frame.height;
  const distance = sender.contentOffset.y <= contentHeight * offset;
  sender.scrollToOffset($point(0, distance ? 0 : contentHeight));
};

const moveArray = {
  data: [],
  index(array, oldIndex, newIndex) {
    if (oldIndex > newIndex) {
      array.splice(newIndex, 0, array[oldIndex]);
      array.splice(oldIndex + 1, 1);
    } else {
      array.splice(newIndex + 1, 0, array[oldIndex]);
      array.splice(oldIndex, 1);
    }
    this.data = array;
  }
};

const inputFocus = (sender, view) => {
  sender.addEventHandler({
    events: $UIEvent.touchCancel,
    handler: sender => {
      sender.focus();
      view.relayout();
      view.updateLayout(make => {
        const y = $ui.window.center.y / 3;
        make.centerY.equalTo(-y);
      });
      $ui.animate({
        duration: 0.3,
        animation: () => view.relayout(),
        completion: () => $app.autoKeyboardEnabled = true
      });
    }
  });
};

const hasTouch = {
  touchesBegan: sender => sender.bgcolor = themeColor[11],
  touchesMoved: (sender, location) => {
    const x_distance = location.x <= 0 || location.x >= sender.frame.width;
    const y_distance = location.y <= 0 || location.y >= sender.frame.height;
    sender.bgcolor = !x_distance && !y_distance ? themeColor[11] : $color("clear");
  },
  touchesEnded: sender => sender.bgcolor = $color("clear")
};

module.exports = {restore, href, getData, getFeedData, search, setFeed, editFeed, feedViewControl, moveArray, inputFocus, hasTouch};
