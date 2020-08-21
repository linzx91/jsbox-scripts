const colors = [
  $color("black"),
  $color("white"),
  $color("#EFEEF4"),
  $color("#1C1C1D"),
  $color("#007AFF"),
  $color("#FFBB00"),
  $color("#4CD964"),
  $rgba(0, 0, 0, 0.5),
  $rgba(239, 241, 243, 0.5),
  $rgba(0, 122, 255, 0.85),
  $rgba(168, 168, 171, 0.2),
  $rgba(98, 98, 101, 0.2),
  $rgba(58, 58, 60, 0.5),
  $rgba(209, 209, 214, 0.5),
  $rgba(255, 59, 48, 0.85),
  $rgba(76, 217, 100, 0.85),
  $rgba(195, 195, 195, 0.9),
  $rgba(85, 85, 85, 0.9),
  $rgba(95, 143, 201, 0.85),
  $rgba(220, 152, 32, 0.85),
  $rgba(220, 174, 29, 0.85),
  $rgba(52, 199, 89, 1),
  $rgba(255, 149, 0, 1),
  $rgba(48, 209, 88, 1),
  $rgba(255, 159, 10, 1),
  $rgba(255, 255, 255, 0.7),
  $rgba(35, 198, 35, 0.9),
  $rgba(201, 201, 200, 0.9),
  $rgba(58, 58, 61, 0.9),
  $rgba(227, 184, 66, 0.9),
  $rgba(0, 0, 0, 0.35),
  $rgba(253, 121, 35, 0.9),
  $rgba(28, 28, 30, 1)
];

const lightMode = [
  0,
  false,
  colors[1],
  colors[3],
  colors[2],
  colors[4],
  colors[6],
  colors[8],
  colors[12],
  15,
  13,
  colors[11],
  colors[17],
  colors[28],
  11,
  14,
  12
];

const darkMode = [
  1,
  true,
  colors[0],
  colors[2],
  colors[3],
  colors[2],
  colors[5],
  colors[7],
  colors[13],
  20,
  18,
  colors[10],
  colors[16],
  colors[27],
  16,
  19,
  17
];

const autoMode = [
  null,
  null,
  $color(colors[1], colors[0]),
  $color(colors[3], colors[2]),
  $color(colors[2], colors[3]),
  $color(colors[4], colors[2]),
  $color(colors[6], colors[5]),
  $color(colors[8], colors[7]),
  $color(colors[12], colors[13]),
  10,
  8,
  $color(colors[11], colors[10]),
  $color(colors[17], colors[16]),
  $color(colors[28], colors[27]),
  6,
  9,
  7
];

if (!$cache.get("theme")) $cache.set("theme", "autoMode");
const theme = $cache.get("theme");

let themeColor, isDarkTheme;
if (theme === "darkMode") {
  $app.theme = "dark";
  themeColor = darkMode;
  isDarkTheme = true;
} else if (theme === "lightMode") {
  $app.theme = "light";
  themeColor = lightMode;
  isDarkTheme = false;
} else if (theme === "autoMode") {
  $app.theme = "auto";
  themeColor = autoMode;
  isDarkTheme = $device.isDarkMode;
}

const keyWindow = $objc("UIApplication").invoke("sharedApplication.keyWindow").jsValue();

class Spinner {
  constructor(sender, id, style, text) {
    this.sender = typeof sender === "object" ? sender : keyWindow;
    this.id = id ? id : "spinner[0]";
    this.style = typeof style === "number" ? style : this.sender === keyWindow ? 0 : 1;
    this.text = text ? text : typeof sender === "string" ? sender : "请稍等";
    this.size = $text.sizeThatFits({
      text: this.text,
      width: this.sender.frame.width - 112,
      font: $font("bold", 17)
    });
    this.spinner = {
      type: "spinner",
      props: {
        id: this.style === 0 ? "spinner[1]" : this.id,
        style: this.style <= 1 ? 0 : this.style - 1,
        loading: true,
        color: themeColor[3],
        alpha: this.style === 0 ? 1 : 0
      },
      layout: make => {
        make.centerX.equalTo(0);
        make.centerY.equalTo(this.style === 0 ? -16 : 0);
      }
    };
    this.label = {
      type: "label",
      props: {
        text: this.text,
        align: $align.center,
        textColor: themeColor[3],
        font: $font("bold", 17)
      },
      layout: (make, view) => {
        make.centerX.equalTo(0);
        make.centerY.equalTo(24);
      }
    };
    this.views = {
      type: "view",
      props: {
        id: this.id,
        bgcolor: colors[30],
        alpha: 0
      },
      layout: $layout.fill,
      views: [
        {
          type: "blur",
          props: {
            style: themeColor[10],
            cornerRadius: 16,
            smoothCorners: true
          },
          layout: (make, view) => {
            make.width.equalTo(this.size.width + 48 < 132 ? 132 : this.size.width + 48);
            make.height.equalTo(view.width);
            make.center.equalTo(view.super);
          },
          views: [
            this.spinner,
            this.label
          ]
        }
      ]
    };
  }
  start() {
    if ($(this.id)) $(this.id).remove();
    this.sender.add(this.style === 0 ? this.views : this.spinner);
    if ($(this.id)) $ui.animate({
      duration: this.style === 0 ? 0.3 : 0.1,
      animation: () => $(this.id).alpha = 1
    });
  }
  async stop(delay) {
    if (delay) await $wait(delay);
    if ($(this.id)) $ui.animate({
      duration: this.style === 0 ? 0.3 : 0.1,
      animation: () => $(this.id).alpha = 0,
      completion: () => $(this.id).remove()
    });
  }
};

const popupGuide = (id, sender, text, bgColor, textColor, direction, duration) => {
  !duration ? duration = 10 : duration;
  const textSize = $text.sizeThatFits({
    text: text,
    width: $ui.window.frame.width - 106,
    height: $ui.window.frame.height - 106,
    font: $font("bold", 16)
  });
  const views = $ui.popover({
    sourceView: sender,
    sourceRect: sender.bounds,
    directions: direction === "up" ? $popoverDirection.up : direction === "down" ? $popoverDirection.down : direction === "left" ? $popoverDirection.left : direction === "right" ? $popoverDirection.right : $popoverDirection.any,
    size: $size(direction === "up" || direction === "down" ? textSize.width + 74 : 48, direction === "left" || direction === "right" ? textSize.height + 74 : 48),
    views: [
      {
        type: "view",
        props: {
          bgcolor: bgColor
        },
        layout: $layout.fill
      },
      {
        type: "view",
        layout: make => {
          direction === "up" ? (make.top.left.right.inset(13), make.bottom.inset(0)) : direction === "down" ? (make.left.right.bottom.inset(13), make.top.inset(0)) : direction === "left" ? (make.top.left.bottom.inset(13), make.right.inset(0)) : (make.top.right.bottom.inset(13), make.left.inset(0));
        },
        views: [
          {
            type: "label",
            props: {
              text: text,
              lines: 0,
              align: $align.center,
              textColor: textColor,
              font: $font("bold", 16)
            },
            layout: (make, view) => {
              direction === "up" || direction === "down" ? make.height.equalTo(view.super) : make.width.equalTo(view.super);
              make.top.left.inset(0);
              direction === "up" || direction === "down" ? make.right.inset(32) : make.bottom.inset(32);
            }
          },
          {
            type: "button",
            props: {
              symbol: "xmark.circle.fill",
              tintColor: textColor,
              bgcolor: $color("clear")
            },
            layout: make => {
              make.size.equalTo($size(32, 32));
              direction === "up" || direction === "down" ? (make.right.inset(0), make.centerY.inset(0)) : (make.bottom.inset(0), make.centerX.inset(0));
            },
            events: {
              ready: async () => {
                await $wait(duration);
                views.dismiss();
              },
              tapped: () => {
                views.dismiss();
                $cache.set(id, 1);
              }
            }
          }
        ]
      }
    ]
  });
  return views;
};

const toast = (sender, symbol, color, text, duration) => {
  const timestamp = new Date().valueOf();
  const topInset = sender.frame.height * 0.11;
  const textSize = $text.sizeThatFits({
    text: text,
    width: sender.frame.width - 80,
    font: $font("bold", 16)
  });
  if (!duration) duration = text.length * 0.3;
  if ($("blur[2]")) $("blur[2]").remove();
  sender.add({
    type: "blur",
    props: {
      id: "blur[2]",
      style: themeColor[15],
      info: timestamp,
      cornerRadius: 18,
      smoothCorners: true,
      userInteractionEnabled: false
    },
    layout: (make, view) => {
      make.width.equalTo(textSize.width + 48);
      make.height.equalTo(36);
      make.top.inset(-36);
      make.centerX.equalTo(view.super);
    },
    views: [
      {
        type: "view",
        layout: (make, view) => {
          make.size.equalTo($size(20, 20));
          make.left.inset(10);
          make.centerY.equalTo(view.super);
        },
        views: [
          {
            type: "image",
            props: {
              symbol: symbol,
              tintColor: color,
              bgcolor: $color("clear")
            },
            layout: $layout.center
          }
        ]
      },
      {
        type: "label",
        props: {
          text: text,
          align: $align.center,
          textColor: themeColor[13],
          font: $font("bold", 16),
          autoFontSize: true
        },
        layout: (make, view) => {
          make.height.equalTo(view.super);
          make.left.equalTo(view.prev.right).offset(8);
          make.right.inset(10);
          make.centerY.inset(0);
        }
      }
    ]
  });
  if (!$("blur[2]")) return;
  $("blur[2]").relayout();
  $("blur[2]").updateLayout(make => make.top.inset(topInset));
  $ui.animate({
    duration: 0.3,
    animation: () => $("blur[2]").relayout(),
    completion: async () => {
      await $wait(duration);
      if (!$("blur[2]") || $("blur[2]").info !== timestamp) return;
      $("blur[2]").relayout();
      $("blur[2]").updateLayout(make => make.top.inset(-36));
      $ui.animate({
        duration: 0.3,
        animation: () => $("blur[2]").relayout(),
        completion: () => $("blur[2]").remove()
      });
    }
  });
};

const lottie = async (object, start, end, loop = false) => {
  object = JSON.parse($file.read("/assets/" + object + ".json").string);
  start === undefined ? (start = 0, end = object.op) : start === true ? ((start = 0, end = object.op), loop = true) : end === true ? ((end = start, start = 0), loop = true) : end === undefined ? (end = start, start = 0) : null;
  const timestamp = new Date().valueOf();
  if ($("view[0]")) $("view[0]").remove();
  keyWindow.add({
    type: "view",
    props: {
      id: "view[0]",
      info: timestamp,
      bgcolor: colors[30],
      alpha: 0
    },
    layout: $layout.fill,
    views: [
      {
        type: "blur",
        props: {
          style: themeColor[10],
          cornerRadius: 16,
          smoothCorners: true
        },
        layout: (make, view) => {
          make.size.equalTo($size(132, 132));
          make.center.equalTo(view.super);
        },
        views: [
          {
            type: "lottie",
            props: {
              json: object,
              loop: loop,
              contentMode: 1
            },
            layout: $layout.fill
          }
        ]
      }
    ]
  });
  if ($("view[0]")) $ui.animate({
    duration: 0.3,
    animation: () => $("view[0]").alpha = 1,
    completion: () => {
      if ($("view[0]").info !== timestamp) return;
      $("lottie").play({
        fromFrame: start,
        toFrame: end,
        handler: finished => {
          if (finished) $ui.animate({
            duration: 0.3,
            animation: () => $("view[0]").alpha = 0,
            completion: () => $("view[0]").remove()
          });
        }
      });
    }
  });
};

module.exports = {colors, theme, isDarkTheme, themeColor, keyWindow, Spinner, popupGuide, toast, lottie}
