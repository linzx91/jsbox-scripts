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
  const onlyURL = /^https?:\/\//i.test(object);
  onlyURL ? (url = object, value = 0, object = 0) : url = url ? url : source.url;
  let name = $text.URLDecode(url.replace(/(^.+\/)|(\.(m3u|json|txt)$)/ig, "")), data = null;
  if (object === 0) {
    const resp = await $http.request({
      method: "GET",
      url: url,
      timeout: 15
    });
    try {
      const isString = typeof resp.data === "string";
      const isObject = typeof resp.data === "object";
      const isM3UFormat = /^https?:\/\/.+\.m3u$/i.test(url) && /(#EXTM3U[\s\S]*?)#EXTINF/g.test(resp.data);
      const isTxtFormat = /^https?:\/\/.+\.txt$/i.test(url) && /.+,(\s+)?https?:\/\//i.test(resp.data);
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
      } else if (isObject && resp.data.some(item => item.hasOwnProperty("name") && item.hasOwnProperty("url"))) {
        data = resp.data.filter(item => item.hasOwnProperty("name") && item.hasOwnProperty("url"));
      }
    } catch (err) {
      const hasOwnChannel = resp.data.hasOwnProperty("channel") || resp.data.hasOwnProperty("channels");
      const hasOwnName = resp.data.hasOwnProperty("title") || resp.data.hasOwnProperty("name");
      const channels = resp.data.channel || resp.data.channels;
      if (hasOwnChannel && channels.some(item => item.hasOwnProperty("name") && item.hasOwnProperty("url"))) data = channels.filter(item => item.hasOwnProperty("name") && item.hasOwnProperty("url"));
      if (hasOwnName) name = resp.data.title || resp.data.name;
    }
    data = data && data.length ? data : null;
    if (resp.error) {
      const message = resp.error.localizedDescription.replace(/。+$/, "");
      toast($("window"), "xmark.circle.fill", colors[14], message.includes("kCFErrorDomainCFNetwork") ? "网络出错，请稍后再试" : message);
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
    } else if (!data && (value > 1 || onlyURL)) {
      const statusCode = resp.response.statusCode;
      const message = /^20\d{1}$/i.test(statusCode) ? `不是正确的 ${/\.m3u$/i.test(url) ? "M3U" : /\.json$/i.test(url) ? "JSON" : "TXT"} 订阅格式` : /^50\d{1}$/i.test(statusCode) ? `${statusCode} 服务器出错，请稍后再试` : `${statusCode} 无法读取该订阅`;
      toast($("window"), "xmark.circle.fill", colors[14], message);
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
    } else if (value < 2) {
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
  return value === 0 ? data : value === 1 && data ? data.map(item => object === 2 && source.id === "feed" ? {label: {text: item.name}, mark: {hidden: item.url !== source.url ? true : false}} : {label: {text: item.name}}) : {name: name, data: data};
};

const getFeedData = async (object, index, url) => {
  const data = index === undefined ? $cache.get("channels") : JSON.parse($file.read("shared://tvbox/feeds.json").string)[index].data ? JSON.parse($file.read("shared://tvbox/feeds.json").string)[index].data : await getData(url);
  return object === 0 ? data : data.map(item => {return {label: {text: item.name}}});
};

const search = async value => {
  const data = !$("view[1]").hidden ? $cache.get("channels") : await getData(1, 0);
  const reg = new RegExp(/((^\s*)|(\s*$))|(\s|-|_|\||\(|\)|\[|\])+/g);
  value = value.toUpperCase().replace(reg, "");
  if (!value) return !$("view[3]").hidden ? [] : -1;
  return !$("view[3]").hidden ? data.filter(item => item.name.toUpperCase().replace(reg, "").includes(value)) : data.findIndex(item => item.name.toUpperCase().replace(reg, "").includes(value));
};

const prompt = (title, text, placeholder, object) => {
  const touches = {
    began: sender => sender.bgcolor = themeColor[11],
    moved: (sender, location) => {
      const x_distance = location.x <= 0 || location.x >= sender.frame.width;
      const y_distance = location.y <= 0 || location.y >= sender.frame.height;
      sender.bgcolor = !x_distance && !y_distance ? themeColor[11] : $color("clear");
    },
    ended: sender => sender.bgcolor = $color("clear")
  };
  $("window").add({
    type: "view",
    props: {
      id: "view[6]",
      bgcolor: colors[30],
      alpha: 0
    },
    layout: $layout.fill,
    views: [
      {
        type: "view",
        layout: $layout.fill,
        events: {
          tapped: () => {
            $("input[1]").blur();
            $("blur[9]").relayout();
            $("blur[9]").updateLayout((make, view) => make.center.equalTo(view.super));
            $ui.animate({
              duration: 0.3,
              animation: () => $("blur[9]").relayout(),
              completion: () => $app.autoKeyboardEnabled = false
            });
          }
        }
      },
      {
        type: "blur",
        props: {
          id: "blur[9]",
          style: themeColor[10],
          cornerRadius: 16,
          smoothCorners: true
        },
        layout: (make, view) => {
          make.width.equalTo(280);
          make.height.equalTo(156);
          make.center.equalTo(view.super);
        },
        views: [
          {
            type: "label",
            props: {
              text: title,
              textColor: themeColor[3],
              font: $font("bold", 20),
              align: $align.center
            },
            layout: make => {
              make.height.equalTo(32);
              make.top.left.right.inset(16);
            }
          },
          {
            type: "input",
            props: {
              id: "input[1]",
              type: $kbType.url,
              cornerRadius: 8,
              smoothCorners: true,
              borderWidth: 1,
              borderColor: themeColor[11],
              tintColor: themeColor[3],
              textColor: themeColor[3],
              bgcolor: themeColor[7],
              placeholder: placeholder,
              font: $font(14),
              accessoryView: {}
            },
            layout: (make, view) => {
              make.height.equalTo(32);
              make.centerY.equalTo(view.super);
              make.left.right.inset(16);
            },
            events: {
              ready: sender => {
                sender.addEventHandler({
                  events: $UIEvent.touchCancel,
                  handler: sender => {
                    sender.focus();
                    $("blur[9]").relayout();
                    $("blur[9]").updateLayout(make => {
                      const y = $ui.window.center.y / 3;
                      make.centerY.equalTo(-y);
                    });
                    $ui.animate({
                      duration: 0.3,
                      animation: () => $("blur[9]").relayout(),
                      completion: () => $app.autoKeyboardEnabled = true
                    });
                  }
                });
              },
              returned: () => object.handler()
            }
          },
          {
            type: "stack",
            layout: make => {
              make.height.equalTo(48);
              make.left.right.bottom.inset(-0.2);
            },
            props: {
              spacing: 0,
              axis: 0,
              distribution: 1,
              alignment: 0,
              stack: {
                views: [
                  {
                    type: "label",
                    props: {
                      text: "取消",
                      align: $align.center,
                      cornerRadius: 0,
                      borderWidth: 0.2,
                      borderColor: $color("gray"),
                      textColor: colors[9],
                      font: $font("bold", 18)
                    },
                    events: {
                      touchesBegan: touches.began,
                      touchesMoved: touches.moved,
                      touchesEnded: touches.ended,
                      tapped: sender => {
                        sender.bgcolor = $color("clear");
                        $("input[1]").blur();
                        $("blur[9]").relayout();
                        $("blur[9]").updateLayout((make, view) => make.center.equalTo(view.super));
                        $ui.animate({
                          duration: 0.3,
                          animation: () => $("blur[9]").relayout()
                        });
                        $ui.animate({
                          duration: 0.3,
                          animation: () => $("view[6]").alpha = 0,
                          completion: () => {
                            $("view[6]").remove();
                            $app.autoKeyboardEnabled = false;
                          }
                        });
                      }
                    }
                  },
                  {
                    type: "label",
                    props: {
                      text: "完成",
                      align: $align.center,
                      cornerRadius: 0,
                      borderWidth: 0.2,
                      borderColor: $color("gray"),
                      textColor: colors[9],
                      font: $font("bold", 18)
                    },
                    events: {
                      touchesBegan: touches.began,
                      touchesMoved: touches.moved,
                      touchesEnded: touches.ended,
                      tapped: sender => {
                        object.handler();
                        sender.bgcolor = $color("clear");
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  });
  $("input[1]").text = text;
  $ui.animate({
    duration: 0.3,
    animation: () => $("view[6]").alpha = 1,
    completion: () => {
      const y = $ui.window.center.y / 3;
      $("input[1]").focus();
      $("blur[9]").relayout();
      $("blur[9]").updateLayout(make => make.centerY.equalTo(-y));
      $ui.animate({
        duration: 0.3,
        animation: () => $("blur[9]").relayout(),
        completion: () => $app.autoKeyboardEnabled = true
      });
    }
  });
};

const setFeed = {
  data: [],
  async handler() {
    this.data[0] = await getData(2, 0);
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
        animation: () => $("view[6]").alpha = 0,
        completion: () => {
          $("view[6]").remove();
          $app.autoKeyboardEnabled = false;
        }
      });
      const index = this.data[0].findIndex(item => item.url.includes(inputValue));
      if (index !== -1) {
        lottie("exclamation");
        await $wait(0.3);
        toast($("window"), "exclamationmark.circle.fill", colors[22], `该地址与「 ${this.data[0][index].name} 」重复`);
        $device.taptic(1);
        await $wait(0.15);
        $device.taptic(1);
        $("list[0]").scrollTo({
          indexPath: $indexPath(0, index),
          animated: true
        });
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
      toast($("window"), "xmark.circle.fill", colors[14], "订阅地址格式错误");
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
      return;
    }
    const spinner = new Spinner();
    spinner.start();
    this.data[2] = await getData(0, 2, inputValue);
    if (this.data[2].data) {
      this.data[1] = {name: this.data[2].name, url: inputValue, data: this.data[2].data};
      if (!$file.exists("shared://tvbox")) $file.mkdir("shared://tvbox");
      if (!$file.exists("shared://tvbox/feeds.json")) {
        $file.write({
          data: $data({
            string: JSON.stringify([this.data[1]])
          }),
          path: "shared://tvbox/feeds.json"
        });
      } else {
        this.data[0].unshift(this.data[1]);
        $file.write({
          data: $data({
            string: JSON.stringify(this.data[0])
          }),
          path: "shared://tvbox/feeds.json"
        });
      }
    }
    spinner.stop();
    lottie(this.data[2].data ? "checkmark" : "xmark");
    if (this.data[2].data) toast($("window"), "checkmark.circle.fill", colors[26], `该订阅一共收录了 ${this.data[2].data.length} 个播放源`);
    $("list[0]").data = await getData(2, 1);
  }
};

const editFeed = {
  data: {},
  async handler() {
    const inputValue = $("input[1]").text.replace(/(^\s*)|(\s*$)/g, "");
    if (!inputValue) {
      toast($("window"), "exclamationmark.circle.fill", colors[14], "订阅名称不能为空");
      $device.taptic(1);
      await $wait(0.15);
      $device.taptic(1);
    } else {
      let data = await getData(2, 0);
      const object = {
        name: $("input[1]").text,
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
      $("input[1]").blur();
      $("blur[9]").relayout();
      $("blur[9]").updateLayout((make, view) => make.center.equalTo(view.super));
      $ui.animate({
        duration: 0.3,
        animation: () => $("blur[9]").relayout()
      });
      $ui.animate({
        duration: 0.3,
        animation: () => $("view[6]").alpha = 0,
        completion: async () => {
          $("list[0]").data = await getData(2, 1);
          $("view[6]").remove();
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

module.exports = {restore, href, getData, getFeedData, search, prompt, setFeed, editFeed, feedViewControl, moveArray};
