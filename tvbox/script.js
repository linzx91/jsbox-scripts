const apps = [
  {
    title: "nPlayer",
    handler: (sender, indexPath) => {
      const data = $cache.get("channels")
      const url = data[indexPath.item].url
      $app.openURL("nplayer-" + url)
    }
  },
  {
    title: "APlayer",
    handler: (sender, indexPath) => {
      const data = $cache.get("channels")
      const url = data[indexPath.item].url
      $app.openURL("alookplayer://" + url)
    }
  },
  {
    title: "PlayerXtreme",
    handler: (sender, indexPath) => {
      const data = $cache.get("channels")
      const url = data[indexPath.item].url
      $app.openURL("playerxtreme://" + url)
    }
  },
  {
    title: "VLC 播放器",
    handler: (sender, indexPath) => {
      const data = $cache.get("channels")
      const url = data[indexPath.item].url
      $app.openURL("vlc://" + url)
    }
  }
]

const color = [
  "black", "white", "#EFEEF4", "#1C1C1D", "#007AFF", "#4CD964", "#FFCC00", $rgba(0, 0, 0, 0.50), $rgba(239, 239, 241, 0.50), 0, 1, true, false
];

const lightMode = [
  color[1], color[9], color[3], color[2], color[4], color[6], color[8], color[12]
];

const darkMode = [
  color[0], color[10], color[2], color[3], color[2], color[5], color[7], color[11]
];

const isDarkMode = $device.isDarkMode
const uiColor = isDarkMode ? darkMode : lightMode

const video = {
  type: "video",
  props: {
    id: "video[0]"
  },
  layout: (make, view) => {
    make.left.right.equalTo(0)
    make.top.equalTo(0)
    make.height.equalTo(256)
  }
}

const highlight = {
  type: "label",
  props: {
    id: "label[0]",
    text: "选择频道开始播放",
    textColor: $color(uiColor[2]),
    bgcolor: $color("clear"),
    align: $align.center,
    font: $font("bold", 14)
  },
  layout: (make, view) => {
    make.left.right.equalTo(0)
    make.top.equalTo(256)
    make.height.equalTo(20)
  }
}

const matrix = {
  type: "matrix",
  props: {
    id: "matrix[0]",
    columns: 2,
    itemHeight: 48,
    spacing: 16,
    bgcolor: $color("clear"),
    template: [{
      type: "label",
      props: {
        id: "name",
        radius: 10,
        bgcolor: $color(uiColor[3]),
        textColor: $color(uiColor[4]),
        align: $align.center,
        font: $font("bold", 17)
      },
      layout: $layout.fill
    }],
    footer: {
      type: "label",
      props: {
        height: 20,
        text: "所有直播链接均来源于网络!",
        textColor: $color("gray"),
        align: $align.center,
        font: $font("bold", 12)
      }
    },
    menu: {
      title: "在其它 App 中打开",
      items: [
        {
          inline: true,
          items: [
            {
              inline: true,
              items: apps
            }
          ]
        },
        {
          title: "分享",
          symbol: "square.and.arrow.up",
          handler: (sender, indexPath) => {
            const data = $cache.get("channels")
            const url = data[indexPath.item].url
            const name = data[indexPath.item].name
            $share.sheet([url, name])
          }
        }
      ]
    }
  },
  layout: (make, view) => {
    make.left.bottom.right.equalTo(0)
    make.top.equalTo(276)
  }
}

const input = {
  type: "input",
  props: {
    id: "input[0]",
    type: $kbType.search,
    darkKeyboard: uiColor[7],
    textColor: $color(uiColor[2]),
    bgcolor: uiColor[6],
    placeholder: "搜索"
  },
  layout: $layout.fill
}

const blur = {
  type: "blur",
  props: {
    id: "blur[0]",
    style: 1,
    radius: 8,
    hidden: true
  },
  views: [input],
  layout: (make, view) => {
    make.top.left.right.inset(16)
    make.height.equalTo(36)
  }
}

const main = {
  props: {
    id: "main",
    title: "TV Box",
    titleColor: $color(uiColor[2]),
    barColor: $color(uiColor[3]),
    iconColor: $color(uiColor[2]),
    bgcolor: $color(uiColor[0]),
    statusBarStyle: uiColor[1],
    navButtons: [
      {
        icon: "023",
        symbol: "checkmark.seal",
        handler: sender => {
          const blur = $("blur[0]")
          const input = $("input[0]")
          if (blur.hidden != true) {
            $ui.animate({
              duration: 0.3,
              animation: () => {
                blur.alpha = 0
              },
              completion: () => {
                blur.hidden = true
                input.blur()
              }
            })
          } else {
            $ui.animate({
              duration: 0.03,
              animation: () => {
                blur.alpha = 1
              },
              completion: () => {
                blur.hidden = false
                input.focus()
              }
            })
          }
        }
      }
    ]
  },
  views: [video, highlight, matrix, blur]
}

const events = data => {
  matrix.events = {
    didSelect: (sender, indexPath) => {
      const name = data[indexPath.item].name
      const url = data[indexPath.item].url
      $("video[0]").src = url
      $delay(0.18, () => {
        $("video[0]").play()
        $("label[0]").text = name
        $("label[0]").textColor = $color(uiColor[5])
      })
    }
  },
  input.events = {
    returned: sender => {
      const input = $("input[0]")
      input.blur()
      $ui.animate({
        duration: 0.3,
        animation: () => {
          $("blur[0]").alpha = 0
        },
        completion: () => {
          $("blur[0]").hidden = true
        }
      })
      const num = search(input.text)
      if (num != -1) {
        $("matrix[0]").scrollTo({
          indexPath: $indexPath(0, num),
          animated: true
        })
      }
      input.text = ""
    }
  }
}

const search = input => {
  const data = $cache.get("channels")
  const name = data.map(item => {
    return item.name.toUpperCase().replace(/\s+/g, "");
  })
  let keywords = input.toUpperCase().replace(/\s+/g, "");
  if (keywords == "") {
    keywords = null
  }
  let result
  const reg = new RegExp(".*" + keywords + ".*")
  for (let i = 0; i < name.length; i++) {
    if (reg.exec(name[i]) != null) {
      result = name[i]
      break
    }
  }
  if (name.indexOf(result) == -1) {
    $ui.toast("未找到该频道！")
  }
  return name.indexOf(result)
}

const getData = () => {
  const dataId = "aHR0cHM6Ly95dW4tMTI1OTQ2ODI4OC5maWxlLm15cWNsb3VkLmNvbS90dkJveC9jaGFubmVscy5qc29u"
  $app.rotateDisabled = true
  $ui.loading(true)
  $http.get({
    url: $text.base64Decode(dataId),
    handler: resp => {
      const request = resp.data
      const cache = $cache.get("channels")
      const raw = typeof request != "object"
      const data = raw ? cache : request
      events(data)
      $ui.render(main)
      $ui.loading(false)
      if (typeof request != "object") {
        $delay(0.18, () => {
          $ui.toast("无法更新数据！")
          $device.taptic(1)
          $delay(0.15, () => {
            $device.taptic(1)
          })
        })
      } else {
        $cache.set("channels", request)
        $delay(0.18, () => {
          $ui.toast(`目前一共收录了 ${data.length} 个直播源`)
          $device.taptic(1)
        })
      }
      const matrix = $("matrix[0]")
      matrix.data = data.map(item => {
        return {
          name: {
            text: "" + item.name
          }
        }
      })
    }
  })
}

getData()
