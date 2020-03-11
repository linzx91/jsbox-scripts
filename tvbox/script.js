/**erots
id: 5e53dd25f94e0f000845a360
build: 18
source: f3646dfe690f4b629508c51800ef7446
*/

const apps = [
  {
    title: "nPlayer",
    handler: (sender, indexPath) => {
      appInfo(indexPath, "nPlayer", "nplayer-");
    }
  },
  {
    title: "APlayer",
    handler: (sender, indexPath) => {
      appInfo(indexPath, "APlayer", "alookplayer://");
    }
  },
  {
    title: "PlayerXtreme",
    handler: (sender, indexPath) => {
      appInfo(indexPath, "PlayerXtreme", "playerxtreme://");
    }
  },
  {
    title: "VLC 播放器",
    handler: (sender, indexPath) => {
      appInfo(indexPath, "VLC 播放器", "vlc://");
    }
  }
];

const colors = [
  "black",
  "white",
  "#EFEEF4",
  "#1C1C1D",
  "#007AFF",
  "#4CD964",
  "#436997",
  $rgba(0, 0, 0, 0.5),
  $rgba(239, 241, 243, 0.5),
  $rgba(0, 122, 255, 0.85),
  $rgba(168, 168, 171, 0.85),
  $rgba(255, 59, 48, 0.85),
  $rgba(103, 103, 105, 0.35),
  $rgba(239, 239, 241, 0.35),
  $rgba(255, 149, 0, 0.85),
  $rgba(76, 217, 100, 0.85),
  $rgba(255, 204, 0, 0.85),
  $rgba(88, 86, 214, 0.85),
  $rgba(95, 143, 201, 0.85),
  $rgba(220, 152, 32, 0.85),
  $rgba(69, 155, 141, 0.85),
  $rgba(40, 183, 141, 0.9),
  $rgba(246, 139, 31, 0.9),
  $rgba(47, 102, 101, 0.9),
  $rgba(246, 169, 69, 0.9),
  $rgba(255, 255, 255, 0.7)
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
  colors[13],
  0,
  5
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
  colors[12],
  3,
  2
];

const isUiColor = $cache.get("uiColor");
const isDarkMode = $device.isDarkMode;
let uiColors = isDarkMode ? darkMode : lightMode;
if (isUiColor != undefined && isUiColor == "darkMode") {
  uiColors = darkMode;
} else if (isUiColor != undefined && isUiColor == "lightMode") {
  uiColors = lightMode;
}

if ($cache.get("switch") != undefined && $cache.get("switch").key != undefined) {
  $cache.clear();
}
if ($cache.get("switch") == undefined) {
  $cache.set("switch", {
    id: "live",
    url: "aHR0cHM6Ly95dW4tMTI1OTQ2ODI4OC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS9qc2JveC90dmJveC9jaGFubmVscy5qc29u"
  });
}

let highColor;
if ($cache.get("switch").id == "movie") {
  if (uiColors == darkMode) {
    highColor = colors[22];
  } else {
    highColor = colors[24];
  }
} else {
  if (uiColors == darkMode) {
    highColor = colors[21];
  } else {
    highColor = colors[23];
  }
}

const navBarButtons = (symbol, object) => {
  let icon;
  if ($device.info.version < "13.0") {
    if (object == "search") {
      icon = $icon("023", $color(uiColors[3]));
    } else if (object == "favor") {
      icon = $icon("061", $color(uiColors[3]));
    } else {
      icon = $icon("093", $color(uiColors[3]));
    }
  }
  return {
    type: "button",
    props: {
      bgcolor: $color("clear")
    },
    views: [
      {
        type: "image",
        props: {
          icon: icon,
          symbol: symbol,
          tintColor: $color(uiColors[3])
        },
        layout: $layout.fill
      }
    ],
    events: {
      tapped: () => {
        if (object == "search") {
          if ($("view[2]").hidden != true) {
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("view[2]").alpha = 0;
              },
              completion: () => {
                $("view[2]").hidden = true;
                $("input[0]").text = "";
                $("input[0]").blur();
              }
            });
            if ($("input[0]").text != "") {
              let matrix;
              const num = search($("input[0]").text);
              if ($("view[0]").hidden != true) {
                matrix = $("matrix[0]");
              } else {
                matrix = $("matrix[1]");
              }
              if (num != -1) {
                $delay(0.3, () => {
                  matrix.scrollTo({
                    indexPath: $indexPath(0, num),
                    animated: true
                  });
                });
              }
            }
          } else {
            if ($("blur[i]").hidden != true) {
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[i]").alpha = 0;
                },
                completion: () => {
                  $("blur[i]").hidden = true;
                }
              });
            }
            if ($("blur[0]").hidden != true) {
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[0]").alpha = 0;
                },
                completion: () => {
                  $("blur[0]").hidden = true;
                }
              });
            }
            if ($("blur[m]").hidden != true) {
              $("input[1]").blur();
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[m]").alpha = 0;
                },
                completion: () => {
                  $("blur[m]").hidden = true;
                  $("view[4]").hidden = true;
                  if ($("view[3]").hidden != false) {
                    $("blur[m]").updateLayout(make => {
                      const screenWidth = $device.info.screen.width;
                      make.height.equalTo(450);
                      make.center.inset(0);
                      if (screenWidth < 400) {
                        make.width.equalTo(296);
                      } else {
                        make.width.equalTo(320);
                      }
                    });
                    $("view[3]").hidden = false;
                  }
                }
              });
            }
            $ui.animate({
              duration: 0.03,
              animation: () => {
                $("view[2]").alpha = 1;
              },
              completion: () => {
                $("view[2]").hidden = false;
                $("input[0]").focus();
              }
            });
          }
        } else if (object == "favor") {
          if ($("blur[m]").hidden != true) {
            $("input[1]").blur();
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[m]").alpha = 0;
              },
              completion: () => {
                $("blur[m]").hidden = true;
                $("view[4]").hidden = true;
                if ($("view[3]").hidden != false) {
                  $("blur[m]").updateLayout(make => {
                    const screenWidth = $device.info.screen.width;
                    make.height.equalTo(450);
                    make.center.inset(0);
                    if (screenWidth < 400) {
                      make.width.equalTo(296);
                    } else {
                      make.width.equalTo(320);
                    }
                  });
                  $("view[3]").hidden = false;
                }
              }
            });
          }
          if ($("view[1]").hidden != false) {
            $("matrix[1]").data = favorData(1);
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("view[0]").alpha = 0;
                $("view[1]").alpha = 1;
              },
              completion: () => {
                $("view[0]").hidden = true;
                $("view[1]").hidden = false;
              }
            });
          } else {
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("view[1]").alpha = 0;
                $("view[0]").alpha = 1;
              },
              completion: () => {
                $("view[1]").hidden = true;
                $("view[0]").hidden = false;
              }
            });
            if ($("stack[0]").hidden != true) {
              $("matrix[1]").scrollToOffset($point(0, 0));
              $("stack[0]").hidden = true;
            }
          }
        } else {
          if ($("blur[0]").hidden != true) {
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[0]").alpha = 0;
              },
              completion: () => {
                $("blur[0]").hidden = true;
              }
            });
          } else {
            if ($("blur[i]").hidden != true) {
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[i]").alpha = 0;
                },
                completion: () => {
                  $("blur[i]").hidden = true;
                }
              });
            }
            if ($("view[2]").hidden != true) {
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("view[2]").alpha = 0;
                },
                completion: () => {
                  $("view[2]").hidden = true;
                  $("input[0]").blur();
                }
              });
            }
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[0]").alpha = 1;
              },
              completion: () => {
                $("blur[0]").hidden = false;
              }
            });
          }
        }
      }
    },
    layout: (make, view) => {
      if ($device.info.version < "13.0") {
        make.size.equalTo($size(22, 22));
      } else {
        make.size.equalTo($size(26, 26));
      }
      make.centerY.inset(0);
      if (object == "search") {
        make.right.inset(0);
      } else if (object == "favor") {
        make.right.inset(54);
      } else {
        make.right.inset(108);
      }
    }
  };
};

const tvMenus = key => {
  let btnTitle, symbol, id, url;
  let [titleColor, tintColor, bgColor, select] = [uiColors[3], uiColors[3], uiColors[7], true];
  if (key == "live") {
    [btnTitle, symbol, id, url] = ["  直播", "tv", "live", "aHR0cHM6Ly95dW4tMTI1OTQ2ODI4OC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS9qc2JveC90dmJveC9jaGFubmVscy5qc29u"];
    if ($cache.get("switch").id == "live") {
    [titleColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
    }
  } else if (key == "movie") {
    [btnTitle, symbol, id, url] = ["  影片", "film", "movie", "aHR0cHM6Ly95dW4tMTI1OTQ2ODI4OC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS9qc2JveC90dmJveC9tb3ZpZXMuanNvbg=="];
    if ($cache.get("switch").id == "movie") {
    [titleColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
    }
  } else {
    [btnTitle, symbol, id] = ["  订阅", "rectangle.and.paperclip", "feed"];
    if ($cache.get("switch").id == "feed") {
    [titleColor, tintColor, bgColor] = [colors[2], colors[2], colors[9]];
    }
  }
  return {
    type: "button",
    props: {
      title: btnTitle,
      symbol: symbol,
      radius: 8,
      smoothRadius: 8,
      userInteractionEnabled: select,
      tintColor: $color(tintColor),
      titleColor: $color(titleColor),
      bgcolor: bgColor,
      font: $font("bold", 16)
    },
    events: {
      tapped: () => {
        if (url != undefined) {
          $cache.set("switch", {
            id: id,
            url: url
          });
          $addin.restart();
        } else {
          $("matrix[2]").data = feedData(1);
          $ui.animate({
            duration: 0.3,
            animation: () => {
              $("blur[i]").alpha = 0;
              $("blur[m]").alpha = 1;
            },
            completion: () => {
              $("blur[i]").hidden = true;
              $("blur[m]").hidden = false;
            }
          });
        }
      }
    }
  };
};

const setTheme = key => {
  let btnTitle, symbol, cache;
  let [titleColor, tintColor, bgColor, select] = [uiColors[3], uiColors[3], uiColors[7], true];
  if (key == "lightMode") {
    [btnTitle, symbol, cache] = ["  浅色主题", "sun.min.fill", "lightMode"];
    if (isUiColor != undefined && isUiColor == "lightMode") {
    [titleColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
    }
  } else if (key == "darkMode") {
    [btnTitle, symbol, cache] = ["  深色主题", "moon.circle", "darkMode"];
    if (isUiColor != undefined && isUiColor == "darkMode") {
    [titleColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
    }
  } else {
    [btnTitle, symbol] = ["  跟随系统", "circle.lefthalf.fill"];
    if (isUiColor == undefined) {
    [titleColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
    }
  }
  return {
    type: "button",
    props: {
      title: btnTitle,
      symbol: symbol,
      radius: 8,
      smoothRadius: 8,
      userInteractionEnabled: select,
      tintColor: $color(tintColor),
      titleColor: $color(titleColor),
      bgcolor: bgColor,
      font: $font("bold", 16)
    },
    events: {
      tapped: () => {
        if (cache != undefined) {
          $cache.set("uiColor", cache);
        } else {
          $cache.remove("uiColor");
        }
        $addin.restart();
      }
    }
  };
};

const navBar = {
  type: "blur",
  props: {
    style: uiColors[9]
  },
  views: [
    {
      type: "view",
      views: [
        {
          type: "button",
          props: {
            title: "TV Box",
            titleColor: $color(uiColors[3]),
            bgcolor: $color("clear"),
            font: $font("bold", 26),
            align: $align.center
          },
          events: {
            tapped: () => {
              if ($("blur[i]").hidden != true) {
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[i]").alpha = 0;
                  },
                  completion: () => {
                    $("blur[i]").hidden = true;
                  }
                });
              } else {
                if ($("blur[0]").hidden != true) {
                  $ui.animate({
                    duration: 0.3,
                    animation: () => {
                      $("blur[0]").alpha = 0;
                    },
                    completion: () => {
                      $("blur[0]").hidden = true;
                    }
                  });
                }
                if ($("view[2]").hidden != true) {
                  $ui.animate({
                    duration: 0.3,
                    animation: () => {
                      $("view[2]").alpha = 0;
                    },
                    completion: () => {
                      $("view[2]").hidden = true;
                      $("input[0]").blur();
                    }
                  });
                }
                if ($("blur[m]").hidden != true) {
                  $("input[1]").blur();
                  $ui.animate({
                    duration: 0.3,
                    animation: () => {
                      $("blur[m]").alpha = 0;
                    },
                    completion: () => {
                      $("blur[m]").hidden = true;
                      $("view[4]").hidden = true;
                      if ($("view[3]").hidden != false) {
                        $("blur[m]").updateLayout(make => {
                          const screenWidth = $device.info.screen.width;
                          make.height.equalTo(450);
                          make.center.inset(0);
                          if (screenWidth < 400) {
                            make.width.equalTo(296);
                          } else {
                            make.width.equalTo(320);
                          }
                        });
                        $("view[3]").hidden = false;
                      }
                    }
                  });
                }
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[i]").alpha = 1;
                  },
                  completion: () => {
                    $("blur[i]").hidden = false;
                  }
                });
              }
            }
          },
          layout: (make, view) => {
            make.height.equalTo(26);
            make.left.centerY.inset(0);
          }
        },
        navBarButtons("circle.righthalf.fill"),
        navBarButtons("heart.circle", "favor"),
        navBarButtons("magnifyingglass.circle", "search")
      ],
      layout: (make, view) => {
        make.top.inset(20);
        make.left.right.inset(16);
        make.bottom.inset(0);
      }
    }
  ],
  layout: (make, view) => {
    make.height.equalTo(64);
    make.top.left.right.inset(0);
  }
};

const switchMenu = {
  type: "blur",
  props: {
    id: "blur[i]",
    style: uiColors[10],
    radius: 12,
    smoothRadius: 12,
    alpha: 0,
    hidden: true
  },
  views: [
    {
      type: "stack",
      props: {
        spacing: 10,
        axis: $stackViewAxis.vertical,
        distribution: $stackViewDistribution.fillEqually,
        alignment: $stackViewAlignment.fill,
        stack: {
          views: [tvMenus("live"), tvMenus("movie"), tvMenus()]
        }
      },
      layout: (make, view) => {
        make.edges.inset(10);
      }
    }
  ],
  layout: (make, view) => {
    make.size.equalTo($size(128, 160));
    make.top.inset(80);
    make.left.inset(16);
  }
};

const themeMenu = {
  type: "blur",
  props: {
    id: "blur[0]",
    style: uiColors[10],
    radius: 12,
    smoothRadius: 12,
    alpha: 0,
    hidden: true
  },
  views: [
    {
      type: "stack",
      props: {
        spacing: 10,
        axis: $stackViewAxis.vertical,
        distribution: $stackViewDistribution.fillEqually,
        alignment: $stackViewAlignment.fill,
        stack: {
          views: [setTheme("lightMode"), setTheme("darkMode"), setTheme()]
        }
      },
      layout: (make, view) => {
        make.edges.inset(10);
      }
    }
  ],
  layout: (make, view) => {
    make.size.equalTo($size(152, 160));
    make.top.inset(80);
    make.right.inset(16);
  }
};

const feedMatrix = {
  type: "blur",
  props: {
    id: "blur[m]",
    style: uiColors[9],
    radius: 16,
    smoothRadius: 16,
    alpha: 0,
    hidden: true
  },
  views: [
    {
      type: "view",
      props: {
        id: "view[3]"
      },
      views: [
        {
          type: "button",
          props: {
            icon: $icon("225", colors[10], $size(22, 22)),
            bgcolor: $color("clear")
          },
          events: {
            tapped: () => {
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[m]").alpha = 0;
                },
                completion: () => {
                  $("blur[m]").hidden = true;
                }
              });
            }
          },
          layout: (make, view) => {
            make.size.equalTo($size(32, 32));
            make.top.inset(8);
            make.centerX.inset(0);
          }
        },
        {
          type: "button",
          props: {
            symbol: "plus.circle",
            title: "  添加订阅",
            radius: 10,
            smoothRadius: 10,
            tintColor: $color(colors[2]),
            titleColor: $color(colors[2]),
            bgcolor: colors[15],
            font: $font("bold", 17)
          },
          events: {
            tapped: () => {
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[m]").alpha = 0;
                },
                completion: () => {
                  $("blur[m]").hidden = true;
                  $("view[3]").hidden = true;
                  $("blur[m]").updateLayout(make => {
                    const screenWidth = $device.info.screen.width;
                    make.height.equalTo(176);
                    make.center.inset(0);
                    if (screenWidth < 400) {
                      make.width.equalTo(296);
                    } else {
                      make.width.equalTo(320);
                    }
                  });
                  $("blur[m]").alpha = 1;
                  $("view[4]").hidden = false;
                  $("blur[m]").hidden = false;
                  const link = $clipboard.link;
                  if (link != undefined) {
                    $("input[1]").text = link;
                  }
                  $("input[1]").focus();
                  $app.autoKeyboardEnabled = true;
                }
              });
            }
          },
          layout: (make, view) => {
            make.height.equalTo(48);
            make.left.right.bottom.inset(16);
          }
        },
        {
          type: "matrix",
          props: {
            id: "matrix[2]",
            columns: 1,
            itemHeight: 48,
            spacing: 16,
            bgcolor: $color("clear"),
            template: [
              {
                type: "label",
                props: {
                  id: "name",
                  radius: 10,
                  smoothRadius: 10,
                  bgcolor: $color(uiColors[4]),
                  textColor: $color(uiColors[5]),
                  align: $align.center,
                  font: $font("bold", 17)
                },
                layout: $layout.fill
              }
            ],
            menu: {
              items: [
                {
                  title: "重命名",
                  symbol: "square.and.pencil",
                  handler: (sender, indexPath) => {
                    const data = feedData();
                    const url = data[indexPath.item].url;
                    const name = data[indexPath.item].name;
                    $cache.set("feedIndex", {
                      item: indexPath.item,
                      url: url
                    });
                    $("input[2]").text = name;
                    $("input[2]").focus();
                    $app.autoKeyboardEnabled = true;
                    $ui.animate({
                      duration: 0.3,
                      animation: () => {
                        $("blur[t]").alpha = 1;
                      },
                      completion: () => {
                        $("blur[t]").hidden = false;
                      }
                    });
                  }
                },
                {
                  title: "分享",
                  symbol: "square.and.arrow.up",
                  handler: (sender, indexPath) => {
                    const data = feedData();
                    const url = data[indexPath.item].url;
                    const name = data[indexPath.item].name;
                    $share.sheet([url, name]);
                  }
                },
                {
                  title: "删除",
                  symbol: "trash",
                  destructive: true,
                  handler: (sender, indexPath) => {
                    const item = indexPath.item;
                    const data = feedData();
                    data.splice(item, 1);
                    if (data.length == 0) {
                      $drive.delete("tvbox/feed.json");
                      $delay(1, () => {
                        $("matrix[2]").data = feedData(1);
                      });
                    } else {
                      $drive.write({
                        data: $data({
                          string: JSON.stringify(data)
                        }),
                        path: "tvbox/feed.json"
                      });
                    }
                    $delay(0.3, () => {
                      $("matrix[2]").delete($indexPath(0, item));
                      $device.taptic(2);
                    });
                  }
                }
              ]
            }
          },
          views: [
            {
              type: "label",
              props: {
                id: "label[2]",
                text: "暂无订阅内容",
                textColor: $color("gray"),
                font: $font("bold", 22),
                align: $align.center,
                hidden: true
              },
              layout: (make, view) => {
                make.center.inset(view.super);
              }
            }
          ],
          events: {
            didSelect: (sender, indexPath) => {
              const data = feedData();
              const url = data[indexPath.item].url;
              $cache.set("switch", {
                id: "feed",
                url: url
              });
              $addin.restart();
            }
          },
          layout: (make, view) => {
            make.top.inset(48);
            make.left.right.inset(0);
            make.bottom.inset(80);
          }
        }
      ],
      layout: $layout.fill
    },
    {
      type: "view",
      props: {
        id: "view[4]",
        hidden: true
      },
      views: [
        {
          type: "label",
          props: {
            text: "添加订阅",
            textColor: $color(uiColors[3]),
            font: $font("bold", 20),
            align: $align.center
          },
          layout: (make, view) => {
            make.height.equalTo(32);
            make.top.inset(16);
            make.left.right.inset(16);
          }
        },
        {
          type: "input",
          props: {
            id: "input[1]",
            type: $kbType.url,
            radius: 8,
            smoothRadius: 8,
            borderWidth: 0.2,
            borderColor: $color("gray"),
            darkKeyboard: uiColors[1],
            textColor: $color(colors[3]),
            bgcolor: colors[25],
            placeholder: "请输入m3u或json格式的订阅地址",
            font: $font(14),
            accessoryView: {}
          },
          events: {
            changed: sender => {
              try {
                const reg = RegExp(/^https?:\/\/[0-9a-zA-Z]+.*(\.+).*\/.*\.(m3u|json)+$/);
                if (sender.text.match(reg)) {
                  $("button[2]").titleColor = colors[9];
                  $("button[2]").userInteractionEnabled = true;
                } else {
                  $("button[2]").titleColor = $color("gray");
                  $("button[2]").userInteractionEnabled = false;
                }
              } catch (e) {
                return false;
              }
            }
          },
          layout: (make, view) => {
            make.height.equalTo(32);
            make.centerY.inset(0);
            make.left.right.inset(16);
          }
        },
        {
          type: "stack",
          props: {
            spacing: 0,
            axis: $stackViewAxis.horizontal,
            distribution: $stackViewDistribution.fillEqually,
            alignment: $stackViewAlignment.fill,
            stack: {
              views: [
                {
                  type: "button",
                  props: {
                    title: "取消",
                    radius: 0,
                    borderWidth: 0.2,
                    borderColor: $color("gray"),
                    titleColor: colors[9],
                    bgcolor: $color("clear"),
                    font: $font("bold", 18)
                  },
                  events: {
                    tapped: () => {
                      $app.autoKeyboardEnabled = false;
                      $("matrix[2]").data = feedData(1);
                      $("input[1]").blur();
                      $ui.animate({
                        duration: 0.3,
                        animation: () => {
                          $("blur[m]").alpha = 0;
                        },
                        completion: () => {
                          $("blur[m]").hidden = true;
                          $("view[4]").hidden = true;
                          $("blur[m]").updateLayout(make => {
                            const screenWidth = $device.info.screen.width;
                            make.height.equalTo(450);
                            make.center.inset(0);
                            if (screenWidth < 400) {
                              make.width.equalTo(296);
                            } else {
                              make.width.equalTo(320);
                            }
                          });
                          $("blur[m]").alpha = 1;
                          $("view[3]").hidden = false;
                          $("blur[m]").hidden = false;
                        }
                      });
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    id: "button[2]",
                    title: "完成",
                    radius: 0,
                    titleColor: colors[9],
                    borderWidth: 0.2,
                    borderColor: $color("gray"),
                    bgcolor: $color("clear"),
                    font: $font("bold", 18)
                  },
                  events: {
                    tapped: () => {
                      $("input[1]").blur();
                      $app.autoKeyboardEnabled = false;
                      try {
                        const feedUrl = $("input[1]").text.match(/https?.*\.(m3u|json)/g).join("");
                        const feedName = $text.URLDecode($("input[1]").text.replace(/.*\/|\.(m3u|json).*/g, ""));
                        if (feedUrl.search(/\.m3u|\.json/) != -1) {
                          if (!$drive.exists("tvbox")) {
                            $drive.mkdir("tvbox");
                          }
                          const obj = [];
                          const arr = {};
                          arr.name = feedName;
                          arr.url = feedUrl;
                          obj.push(arr);
                          if (!$drive.exists("tvbox/feed.json")) {
                            $drive.write({
                              data: $data({
                                string: JSON.stringify(obj)
                              }),
                              path: "tvbox/feed.json"
                            });
                            $device.taptic(2);
                          } else {
                            const newFeeds = [];
                            const feeds = feedData();
                            let obj;
                            for (let i = 0; i < feeds.length; i++) {
                              if (feeds[i].url === arr.url) {
                                obj = feeds[i];
                              } else {
                                newFeeds.push(feeds[i]);
                              }
                            }
                            if (obj != undefined && obj.url === arr.url) {
                              $ui.toast("该地址已存在");
                              $device.taptic(1);
                              $delay(0.15, () => {
                                $device.taptic(1);
                              });
                            } else {
                              newFeeds.unshift(arr);
                              $drive.write({
                                data: $data({
                                  string: JSON.stringify(newFeeds)
                                }),
                                path: "tvbox/feed.json"
                              });
                              $device.taptic(2);
                            }
                          }
                          $("matrix[2]").data = feedData(1);
                          $ui.animate({
                            duration: 0.3,
                            animation: () => {
                              $("blur[m]").alpha = 0;
                            },
                            completion: () => {
                              $("blur[m]").hidden = true;
                              $("view[4]").hidden = true;
                              $("blur[m]").updateLayout(make => {
                                const screenWidth = $device.info.screen.width;
                                make.height.equalTo(450);
                                make.center.inset(0);
                                if (screenWidth < 400) {
                                  make.width.equalTo(296);
                                } else {
                                  make.width.equalTo(320);
                                }
                              });
                              $("blur[m]").alpha = 1;
                              $("view[3]").hidden = false;
                              $("blur[m]").hidden = false;
                            }
                          });
                        }
                      } catch (e) {
                        if ($("input[1]").text == "") {
                          return false;
                        } else {
                          $ui.toast("不支持此地址");
                          $device.taptic(1);
                          $delay(0.15, () => {
                            $device.taptic(1);
                          });
                        }
                      }
                    }
                  }
                }
              ]
            }
          },
          layout: (make, view) => {
            make.height.equalTo(48);
            make.left.right.bottom.inset(-0.2);
          }
        }
      ],
      layout: $layout.fill
    }
  ],
  layout: (make, view) => {
    const screenWidth = $device.info.screen.width;
    make.height.equalTo(450);
    make.center.inset(0);
    if (screenWidth < 400) {
      make.width.equalTo(296);
    } else {
      make.width.equalTo(320);
    }
  }
};

const editFeed = {
  type: "blur",
  props: {
    id: "blur[t]",
    style: uiColors[9],
    radius: 16,
    smoothRadius: 16,
    alpha: 0,
    hidden: true
  },
  views: [
    {
      type: "label",
      props: {
        text: "重命名",
        textColor: $color(uiColors[3]),
        font: $font("bold", 20),
        align: $align.center
      },
      layout: (make, view) => {
        make.height.equalTo(32);
        make.top.inset(16);
        make.left.right.inset(16);
      }
    },
    {
      type: "input",
      props: {
        id: "input[2]",
        type: $kbType.default,
        radius: 8,
        smoothRadius: 8,
        borderWidth: 0.2,
        borderColor: $color("gray"),
        darkKeyboard: uiColors[1],
        textColor: $color(colors[3]),
        bgcolor: colors[25],
        placeholder: "请输入订阅名称",
        font: $font(14),
        accessoryView: {}
      },
      layout: (make, view) => {
        make.height.equalTo(32);
        make.centerY.inset(0);
        make.left.right.inset(16);
      }
    },
    {
      type: "stack",
      props: {
        spacing: 0,
        axis: $stackViewAxis.horizontal,
        distribution: $stackViewDistribution.fillEqually,
        alignment: $stackViewAlignment.fill,
        stack: {
          views: [
            {
              type: "button",
              props: {
                title: "取消",
                radius: 0,
                titleColor: colors[9],
                borderWidth: 0.2,
                borderColor: $color("gray"),
                bgcolor: $color("clear"),
                font: $font("bold", 18)
              },
              events: {
                tapped: () => {
                  $app.autoKeyboardEnabled = false;
                  $("input[2]").blur();
                  $ui.animate({
                    duration: 0.3,
                    animation: () => {
                      $("blur[t]").alpha = 0;
                    },
                    completion: () => {
                      $("blur[t]").hidden = true;
                    }
                  });
                }
              }
            },
            {
              type: "button",
              props: {
                title: "完成",
                radius: 0,
                titleColor: colors[9],
                borderWidth: 0.2,
                borderColor: $color("gray"),
                bgcolor: $color("clear"),
                font: $font("bold", 18)
              },
              events: {
                tapped: () => {
                  $app.autoKeyboardEnabled = false;
                  $("input[2]").blur();
                  let data = feedData();
                  const index = $cache.get("feedIndex");
                  const arr = {};
                  arr.name = $("input[2]").text;
                  arr.url = index.url;
                  data.splice(index.item, 1, arr);
                  $drive.write({
                    data: $data({
                      string: JSON.stringify(data)
                    }),
                    path: "tvbox/feed.json"
                  });
                  $("matrix[2]").data = feedData(1);
                  $ui.animate({
                    duration: 0.3,
                    animation: () => {
                      $("blur[t]").alpha = 0;
                    },
                    completion: () => {
                      $("blur[t]").hidden = true;
                    }
                  });
                }
              }
            }
          ]
        }
      },
      layout: (make, view) => {
        make.height.equalTo(48);
        make.left.right.bottom.inset(-0.2);
      }
    }
  ],
  layout: (make, view) => {
    const screenWidth = $device.info.screen.width;
    make.height.equalTo(176);
    make.center.inset(0);
    if (screenWidth < 400) {
      make.width.equalTo(296);
    } else {
      make.width.equalTo(320);
    }
  }
};

const video = {
  type: "video",
  props: {
    id: "video[0]"
  },
  layout: (make, view) => {
    make.height.equalTo(248);
    make.top.inset(64);
    make.left.right.inset(0);
  }
};

const highlight = {
  type: "label",
  props: {
    id: "label[0]",
    text: "选择频道开始播放",
    textColor: $color(uiColors[3]),
    font: $font("bold", 14),
    align: $align.center
  },
  layout: (make, view) => {
    make.height.equalTo(24);
    make.top.inset(312);
    make.left.right.inset(0);
  }
};

const matrix = {
  type: "matrix",
  props: {
    id: "matrix[0]",
    columns: 2,
    itemHeight: 48,
    spacing: 16,
    bgcolor: $color("clear"),
    template: [
      {
        type: "label",
        props: {
          id: "name",
          radius: 10,
          smoothRadius: 10,
          bgcolor: $color(uiColors[4]),
          textColor: $color(uiColors[5]),
          align: $align.center,
          font: $font("bold", 17)
        },
        layout: $layout.fill
      }
    ],
    footer: {
      type: "label",
      props: {
        height: 20,
        text: "所有播放源均来源于网络!",
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
          title: "收藏",
          symbol: "heart",
          handler: (sender, indexPath) => {
            const data = $cache.get("channels");
            const item = data[indexPath.item];
            if (!$drive.exists("tvbox")) {
              $drive.mkdir("tvbox");
            }
            if (!$drive.exists("tvbox/favor.json")) {
              const select = [item];
              $drive.write({
                data: $data({
                  string: JSON.stringify(select)
                }),
                path: "tvbox/favor.json"
              });
            } else {
              const favors = favorData();
              let newFavors = [];
              for (let i = 0; i < favors.length; i++) {
                if (favors[i].name != item.name && favors[i].url != item.url) {
                  newFavors.push(favors[i]);
                }
              }
              newFavors.unshift(item);
              $drive.write({
                data: $data({
                  string: JSON.stringify(newFavors)
                }),
                path: "tvbox/favor.json"
              });
            }
            $delay(0.3, () => {
              $device.taptic(2);
            });
          }
        },
        {
          title: "分享",
          symbol: "square.and.arrow.up",
          handler: (sender, indexPath) => {
            const data = $cache.get("channels");
            const url = data[indexPath.item].url;
            const name = data[indexPath.item].name;
            $share.sheet([url, name]);
          }
        }
      ]
    }
  },
  layout: $layout.fill
};

const matrixView = {
  type: "view",
  props: {
    id: "view[0]"
  },
  views: [matrix],
  layout: (make, view) => {
    make.top.inset(336);
    make.left.right.bottom.inset(0);
  }
};

const fCloseBtn = {
  type: "button",
  props: {
    id: "button[1]",
    icon: $icon("225", colors[10], $size(22, 22)),
    bgcolor: $color("clear")
  },
  layout: (make, view) => {
    make.size.equalTo($size(32, 32));
    make.top.inset(24);
    make.centerX.inset(view.super);
  }
};

const favorMatrix = {
  type: "matrix",
  props: {
    id: "matrix[1]",
    columns: 2,
    itemHeight: 48,
    spacing: 16,
    bgcolor: $color("clear"),
    template: [
      {
        type: "label",
        props: {
          id: "name",
          radius: 10,
          smoothRadius: 10,
          bgcolor: $color(uiColors[4]),
          textColor: $color(uiColors[5]),
          align: $align.center,
          font: $font("bold", 17)
        },
        layout: $layout.fill
      }
    ],
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
          title: "移除",
          symbol: "heart.slash",
          destructive: true,
          handler: (sender, indexPath) => {
            const item = indexPath.item;
            const data = favorData();
            data.splice(item, 1);
            if (data.length == 0) {
              $drive.delete("tvbox/favor.json");
              $delay(1, () => {
                $("matrix[1]").data = favorData(1);
              });
            } else {
              $drive.write({
                data: $data({
                  string: JSON.stringify(data)
                }),
                path: "tvbox/favor.json"
              });
            }
            $delay(0.3, () => {
              $("matrix[1]").delete($indexPath(0, item));
              $device.taptic(2);
            });
          }
        },
        {
          title: "分享",
          symbol: "square.and.arrow.up",
          handler: (sender, indexPath) => {
            const data = favorData();
            const url = data[indexPath.item].url;
            const name = data[indexPath.item].name;
            $share.sheet([url, name]);
          }
        }
      ]
    }
  },
  layout: $layout.fill
};

const favorLabel = {
  type: "label",
  props: {
    id: "label[1]",
    text: "暂未收藏任何频道",
    textColor: $color("gray"),
    font: $font("bold", 22),
    align: $align.center,
    hidden: true
  },
  layout: (make, view) => {
    make.center.inset(view.super);
  }
};

let icon_trash;
if ($device.info.version < "13.0") {
  icon_trash = $icon("027", $color(colors[2]), $size(18, 18));
}
let icon_edit;
if ($device.info.version < "13.0") {
  icon_edit = $icon("021", $color(colors[2]), $size(18, 18));
}
const favorBtns = {
  type: "stack",
  props: {
    id: "stack[0]",
    spacing: 16,
    axis: $stackViewAxis.horizontal,
    distribution: $stackViewDistribution.fillEqually,
    alignment: $stackViewAlignment.fill,
    hidden: true,
    stack: {
      views: [
        {
          type: "button",
          props: {
            title: "  全部删除",
            icon: icon_trash,
            symbol: "trash",
            radius: 10,
            smoothRadius: 10,
            tintColor: $color(colors[2]),
            titleColor: $color(colors[2]),
            bgcolor: colors[11],
            font: $font("bold", 17)
          },
          events: {
            tapped: () => {
              const contentHeight = $("matrix[1]").contentSize.height;
              $ui.alert({
                title: "提示",
                message: "此操作将会删除已收藏的所有内容\n是否要继续？",
                actions: [
                  {
                    title: "取消",
                    handler: () => {
                      $("stack[0]").hidden = true;
                      $("matrix[1]").scrollToOffset($point(0, 0));
                    }
                  },
                  {
                    title: "继续",
                    handler: async () => {
                      $drive.delete("tvbox/favor.json");
                      $("matrix[1]").scrollToOffset($point(0, contentHeight));
                      $("stack[0]").hidden = true;
                      await $wait(0.5);
                      $("matrix[1]").data = favorData(1);
                    }
                  }
                ]
              });
            }
          }
        },
        {
          type: "button",
          props: {
            title: "  文本编辑",
            icon: icon_edit,
            symbol: "square.and.pencil",
            radius: 10,
            smoothRadius: 10,
            tintColor: $color(colors[2]),
            titleColor: $color(colors[2]),
            bgcolor: colors[20],
            font: $font("bold", 17)
          },
          events: {
            tapped: () => {
              if ($cache.get("editorVal") != undefined) {
                $cache.remove("editorVal");
              }
              if ($("blur[i]").hidden != true) {
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[i]").alpha = 0;
                  },
                  completion: () => {
                    $("blur[i]").hidden = true;
                  }
                });
              }
              if ($("blur[0]").hidden != true) {
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[0]").alpha = 0;
                  },
                  completion: () => {
                    $("blur[0]").hidden = true;
                  }
                });
              } else if ($("view[2]").hidden != true) {
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("view[2]").alpha = 0;
                  },
                  completion: () => {
                    $("view[2]").hidden = true;
                    $("input[0]").blur();
                  }
                });
              }
              $("code[0]").text = JSON.stringify(favorData(), null, 2);
              $("stack[0]").hidden = true;
              $("matrix[1]").scrollToOffset($point(0, 0));
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[1]").alpha = 1;
                },
                completion: () => {
                  $("blur[1]").hidden = false;
                }
              });
            }
          }
        }
      ]
    }
  },
  layout: (make, view) => {
    make.top.left.right.inset(16);
    make.height.equalTo(48);
  }
};

const favorites = {
  type: "view",
  props: {
    id: "view[1]",
    alpha: 0,
    hidden: true
  },
  views: [
    {
      type: "blur",
      props: {
        style: uiColors[9],
        radius: 16,
        smoothRadius: 16
      },
      views: [favorLabel, favorMatrix, favorBtns],
      layout: (make, view) => {
        make.top.inset(64);
        make.left.right.bottom.inset(8);
      }
    },
    fCloseBtn
  ],
  layout: (make, view) => {
    make.top.inset(336);
    make.left.right.bottom.inset(0);
  }
};

const sInput = {
  type: "input",
  props: {
    id: "input[0]",
    type: $kbType.search,
    darkKeyboard: uiColors[1],
    tintColor: $color(uiColors[3]),
    textColor: $color(uiColors[3]),
    bgcolor: $color("clear"),
    placeholder: "搜索",
    accessoryView: {}
  },
  layout: $layout.fill
};

const sCancelBtn = {
  type: "button",
  props: {
    id: "button[0]",
    title: "取消",
    radius: 8,
    smoothRadius: 8,
    bgcolor: colors[9],
    titleColor: $color(colors[2]),
    font: $font("bold", 17)
  },
  layout: (make, view) => {
    make.width.equalTo(64);
    make.height.equalTo(view.super);
    make.top.right.inset(0);
  }
};

const searchBox = {
  type: "view",
  props: {
    id: "view[2]",
    alpha: 0,
    hidden: true
  },
  views: [
    {
      type: "blur",
      props: {
        style: uiColors[10],
        radius: 8,
        smoothRadius: 8
      },
      views: [sInput],
      layout: (make, view) => {
        make.height.equalTo(view.super);
        make.top.left.inset(0);
        make.right.inset(72);
      }
    },
    sCancelBtn
  ],
  layout: (make, view) => {
    make.height.equalTo(36);
    make.top.inset(80);
    make.left.right.inset(16);
  }
};

const codeEditor = {
  type: "blur",
  props: {
    id: "blur[1]",
    style: 3,
    alpha: 0,
    hidden: true
  },
  views: [
    {
      type: "blur",
      props: {
        id: "blur[2]",
        style: 3,
        radius: 16,
        smoothRadius: 16
      },
      views: [
        {
          type: "code",
          props: {
            id: "code[0]",
            language: "json",
            theme: "night-owl",
            darkKeyboard: true,
            adjustInsets: true,
            lineNumbers: true,
            radius: 16,
            smoothRadius: 16,
            bgcolor: $color("clear"),
            font: $font("JetBrainsMono-Regular", 14),
            keys: ["[", "]", "{", "}", '"', ":", ",", "/", "."]
          },
          events: {
            changed: sender => {
              if ($cache.get("editorVal") == undefined) {
                $cache.set("editorVal", sender.text);
              }
            }
          },
          layout: $layout.fill
        }
      ],
      layout: (make, view) => {
        make.top.inset(80);
        make.left.right.inset(16);
        make.bottom.inset(112);
      }
    },
    {
      type: "blur",
      props: {
        id: "blur[3]",
        style: 3,
        radius: 16,
        smoothRadius: 16
      },
      views: [
        {
          type: "stack",
          props: {
            spacing: 16,
            axis: $stackViewAxis.horizontal,
            distribution: $stackViewDistribution.fillEqually,
            alignment: $stackViewAlignment.fill,
            stack: {
              views: [
                {
                  type: "button",
                  props: {
                    title: "取消",
                    radius: 10,
                    smoothRadius: 10,
                    bgcolor: colors[11],
                    font: $font("bold", 17)
                  },
                  events: {
                    tapped: () => {
                      $("code[0]").blur();
                      const cacheVal = $cache.get("editorVal") != undefined && $("code[0]").text != $cache.get("editorVal");
                      const sourceVal = $("code[0]").text != JSON.stringify(favorData(), null, 2);
                      if (sourceVal || cacheVal) {
                        $ui.alert({
                          title: "提示",
                          message: "要放弃未保存的修改吗？",
                          actions: [
                            {
                              title: "继续编辑"
                            },
                            {
                              title: "放弃",
                              handler: () => {
                                $ui.animate({
                                  duration: 0.3,
                                  animation: () => {
                                    $("blur[1]").alpha = 0;
                                  },
                                  completion: () => {
                                    $("blur[1]").hidden = true;
                                  }
                                });
                              }
                            }
                          ]
                        });
                      } else {
                        $ui.animate({
                          duration: 0.3,
                          animation: () => {
                            $("blur[1]").alpha = 0;
                          },
                          completion: () => {
                            $("blur[1]").hidden = true;
                          }
                        });
                      }
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    title: "完成",
                    radius: 10,
                    smoothRadius: 10,
                    bgcolor: colors[9],
                    font: $font("bold", 17)
                  },
                  events: {
                    tapped: async () => {
                      const matrixHeight = $("matrix[1]").frame.height;
                      $("code[0]").blur();
                      $("spinner[0]").start();
                      try {
                        const obj = JSON.parse($("code[0]").text);
                        $drive.write({
                          data: $data({
                            string: JSON.stringify(obj)
                          }),
                          path: "tvbox/favor.json"
                        });
                        $("matrix[1]").scrollToOffset($point(0, -matrixHeight));
                        await $wait(1);
                        $ui.animate({
                          duration: 0.3,
                          animation: () => {
                            $("blur[1]").alpha = 0;
                          },
                          completion: () => {
                            $("blur[1]").hidden = true;
                            $("matrix[1]").scrollToOffset($point(0, 0));
                          }
                        });
                      } catch (e) {
                        if ($("code[0]").text == "") {
                          $drive.delete("tvbox/favor.json");
                          await $wait(1);
                          $ui.animate({
                            duration: 0.3,
                            animation: () => {
                              $("blur[1]").alpha = 0;
                            },
                            completion: () => {
                              $("blur[1]").hidden = true;
                            }
                          });
                        } else {
                          $ui.alert({
                            title: "格式错误",
                            message: "您输入的格式不正确\n请按照 JSON 文件格式进行编辑",
                            actions: [
                              {
                                title: "好的"
                              }
                            ]
                          });
                        }
                      }
                      $("spinner[0]").stop();
                      $("matrix[1]").data = favorData(1);
                    }
                  }
                }
              ]
            }
          },
          layout: (make, view) => {
            make.height.equalTo(48);
            make.edges.inset(16);
          }
        }
      ],
      layout: (make, view) => {
        make.height.equalTo(80);
        make.left.right.bottom.inset(16);
      }
    }
  ],
  layout: $layout.fill
};

const spinBox = {
  type: "spinner",
  props: {
    id: "spinner[0]",
    loading: false,
    color: $color("clear")
  },
  views: [
    {
      type: "blur",
      props: {
        style: uiColors[10],
        radius: 16,
        smoothRadius: 16
      },
      views: [
        {
          type: "spinner",
          props: {
            loading: true,
            style: 0,
            color: $color(uiColors[3])
          },
          layout: (make, view) => {
            make.centerX.equalTo(0);
            make.centerY.equalTo(-16);
          }
        },
        {
          type: "label",
          props: {
            text: "请稍等",
            font: $font("bold", 17),
            align: $align.center,
            textColor: $color(uiColors[3])
          },
          layout: (make, view) => {
            make.centerX.equalTo(0);
            make.centerY.equalTo(24);
          }
        }
      ],
      layout: $layout.fill
    }
  ],
  layout: (make, view) => {
    make.size.equalTo($size(132, 132));
    make.center.equalTo(view.super);
  }
};

const main = {
  props: {
    id: "main",
    titleColor: $color(uiColors[3]),
    barColor: $color(uiColors[4]),
    iconColor: $color(uiColors[3]),
    bgcolor: $color(uiColors[2]),
    statusBarStyle: uiColors[0],
    multipleTouchEnabled: false,
    navBarHidden: true
  },
  views: [
    video,
    matrixView,
    highlight,
    favorites,
    searchBox,
    codeEditor,
    navBar,
    feedMatrix,
    editFeed,
    themeMenu,
    switchMenu,
    spinBox
  ]
};

const events = data => {
  matrix.events = {
    didSelect: (sender, indexPath) => {
      const name = data[indexPath.item].name;
      const url = data[indexPath.item].url;
      if ($("blur[i]").hidden != true) {
        $ui.animate({
          duration: 0.3,
          animation: () => {
            $("blur[i]").alpha = 0;
          },
          completion: () => {
            $("blur[i]").hidden = true;
          }
        });
      }
      if ($("blur[0]").hidden != true) {
        $ui.animate({
          duration: 0.3,
          animation: () => {
            $("blur[0]").alpha = 0;
          },
          completion: () => {
            $("blur[0]").hidden = true;
          }
        });
      }
      if ($device.networkType == 2) {
        $delay(0.3, () => {
          $ui.toast("您当前处于移动网络，请注意流量消耗", 3);
        });
      }
      $("video[0]").src = url;
      $delay(0.3, () => {
        $("video[0]").play();
        $("label[0]").text = name;
        $("label[0]").textColor = highColor;
      });
    },
    didEndDragging: () => {
      if ($("view[2]").hidden != true) {
        $ui.animate({
          duration: 0.3,
          animation: () => {
            $("view[2]").alpha = 0;
          },
          completion: () => {
            $("view[2]").hidden = true;
            $("input[0]").blur();
          }
        });
      }
    }
  };
  favorMatrix.events = {
    didSelect: (sender, indexPath) => {
      const name = favorData()[indexPath.item].name;
      const url = favorData()[indexPath.item].url;
      if ($("blur[i]").hidden != true) {
        $ui.animate({
          duration: 0.3,
          animation: () => {
            $("blur[i]").alpha = 0;
          },
          completion: () => {
            $("blur[i]").hidden = true;
          }
        });
      }
      if ($("blur[0]").hidden != true) {
        $ui.animate({
          duration: 0.3,
          animation: () => {
            $("blur[0]").alpha = 0;
          },
          completion: () => {
            $("blur[0]").hidden = true;
          }
        });
      }
      if ($device.networkType == 2) {
        $delay(0.3, () => {
          $ui.toast("您当前处于移动网络，请注意流量消耗", 3);
        });
      }
      $("video[0]").src = url;
      $delay(0.3, () => {
        $("video[0]").play();
        $("label[0]").text = name;
        $("label[0]").textColor = highColor;
      });
    },
    willBeginDragging: () => {
      if ($("stack[0]").hidden != true) {
        $("stack[0]").hidden = true;
      }
    },
    didEndDragging: () => {
      if ($("view[2]").hidden != true) {
        $ui.animate({
          duration: 0.3,
          animation: () => {
            $("view[2]").alpha = 0;
          },
          completion: () => {
            $("view[2]").hidden = true;
            $("input[0]").blur();
          }
        });
      }
    }
  };
  fCloseBtn.events = {
    tapped: () => {
      if ($("stack[0]").hidden != true) {
        $("matrix[1]").scrollToOffset($point(0, 0));
      }
      $ui.animate({
        duration: 0.3,
        animation: () => {
          $("view[1]").alpha = 0;
          $("view[0]").alpha = 1;
        },
        completion: () => {
          $("view[1]").hidden = true;
          $("stack[0]").hidden = true;
          $("view[0]").hidden = false;
        }
      });
    },
    longPressed: async () => {
      if ($drive.exists("tvbox/favor.json")) {
        if ($("stack[0]").hidden != false) {
          $("matrix[1]").scrollToOffset($point(0, -64));
          await $wait(0.3);
          $("stack[0]").hidden = false;
        } else {
          $("stack[0]").hidden = true;
          $("matrix[1]").scrollToOffset($point(0, 0));
        }
        $device.taptic(2);
      }
    }
  };
  sInput.events = {
    returned: async () => {
      $("input[0]").blur();
      $ui.animate({
        duration: 0.3,
        animation: () => {
          $("view[2]").alpha = 0;
        },
        completion: () => {
          $("view[2]").hidden = true;
          $("input[0]").text = "";
        }
      });
      let matrix;
      const num = search($("input[0]").text);
      if ($("view[0]").hidden != true) {
        matrix = $("matrix[0]");
      } else {
        matrix = $("matrix[1]");
      }
      if (num != -1) {
        await $wait(0.3);
        if ($("stack[0]").hidden != true) {
          $("stack[0]").hidden = true;
        }
        matrix.scrollTo({
          indexPath: $indexPath(0, num),
          animated: true
        });
      }
    }
  };
  sCancelBtn.events = {
    tapped: () => {
      $ui.animate({
        duration: 0.3,
        animation: () => {
          $("view[2]").alpha = 0;
        },
        completion: () => {
          $("view[2]").hidden = true;
          $("input[0]").blur();
        }
      });
    }
  };
  highlight.events = {
    tapped: () => {
      const defLabel = highlight.props.text;
      if ($("label[0]").text != defLabel) {
        let matrix;
        const num = search($("label[0]").text);
        if ($("view[0]").hidden != true) {
          matrix = $("matrix[0]");
        } else {
          matrix = $("matrix[1]");
        }
        if (num != -1) {
          if ($("stack[0]").hidden != true) {
            $("stack[0]").hidden = true;
          }
          matrix.scrollTo({
            indexPath: $indexPath(0, num),
            animated: true
          });
        }
      }
    }
  };
};

const search = input => {
  let data;
  if ($("view[0]").hidden != true) {
    data = $cache.get("channels");
  } else {
    data = favorData();
  }
  const name = data.map(item => {
    return item.name.toUpperCase().replace(/\s+|-/g, "");
  });
  let keywords = input.toUpperCase().replace(/\s+|-/g, "");
  if (keywords == "") {
    let label;
    if ($cache.get("switch").id == "movie") {
      label = "请输入影片名称或关键词再继续";
    } else {
      label = "请输入频道名称或关键词再继续";
    }
    $delay(0.3, () => {
      $ui.toast(label);
      $device.taptic(1);
      $delay(0.15, () => {
        $device.taptic(1);
      });
    });
    keywords = null;
  }
  let result;
  const reg = new RegExp(".*" + keywords + ".*");
  for (let i = 0; i < name.length; i++) {
    if (reg.exec(name[i]) != null) {
      result = name[i];
      break;
    }
  }
  let label;
  if ($cache.get("switch").id == "movie") {
    label = "在当前菜单中未找到该影片";
  } else {
    label = "在当前菜单中未找到该频道";
  }
  if (name.indexOf(result) == -1 && input != "") {
    $delay(0.3, () => {
      $ui.toast(label);
      $device.taptic(1);
      $delay(0.15, () => {
        $device.taptic(1);
      });
    });
  }
  return name.indexOf(result);
};

const setData = data => {
  $ui.render(main);
  $ui.loading(false);
  const isIpad = $device.isIpad;
  const isIpadPro = $device.isIpadPro;
  const isIphoneX = $device.isIphoneX;
  if (isIpad || isIpadPro) {
    $("video[0]").updateLayout(make => {
      make.height.equalTo(296);
      make.top.inset(64);
      make.left.right.inset(0);
    });
    $("label[0]").updateLayout(make => {
      make.height.equalTo(24);
      make.top.inset(360);
      make.left.right.inset(0);
    });
    $("view[0]").updateLayout(make => {
      make.top.inset(384);
      make.left.right.bottom.inset(0);
    });
    $("view[1]").updateLayout(make => {
      make.top.inset(384);
      make.left.right.bottom.inset(40);
    });
    $("blur[2]").updateLayout(make => {
      make.top.inset(80);
      make.left.right.inset(16);
      make.bottom.inset(160);
    });
    $("blur[3]").updateLayout(make => {
      make.height.equalTo(80);
      make.left.right.inset(16);
      make.bottom.inset(64);
    });
  } else if (isIphoneX) {
    $("view[1]").updateLayout(make => {
      make.top.inset(360);
      make.bottom.inset(48);
      make.left.right.inset(0);
    });
    $("blur[2]").updateLayout(make => {
      make.top.inset(80);
      make.left.right.inset(16);
      make.bottom.inset(160);
    });
    $("blur[3]").updateLayout(make => {
      make.height.equalTo(80);
      make.left.right.inset(16);
      make.bottom.inset(64);
    });
  }
  $("matrix[0]").data = data.map(item => {
    return {
      name: {
        text: item.name
      }
    };
  });
};

const favorData = re => {
  let data = [],
    names = [];
  if ($drive.exists("tvbox/favor.json")) {
    data = JSON.parse($drive.read("tvbox/favor.json").string);
    names = data.map(item => {
      return {
        name: {
          text: item.name
        }
      };
    });
  }
  if (data.length == 0) {
    if ($("stack[0]").hidden != true) {
      $("stack[0]").hidden = true;
      $("matrix[1]").scrollToOffset($point(0, 0));
    }
    $("label[1]").hidden = false;
  } else {
    $("label[1]").hidden = true;
  }
  if (re === 1) {
    return names;
  } else {
    return data;
  }
};

const feedData = re => {
  let data = [],
    names = [];
  if ($drive.exists("tvbox/feed.json")) {
    data = JSON.parse($drive.read("tvbox/feed.json").string);
    names = data.map(item => {
      return {
        name: {
          text: item.name
        }
      };
    });
  }
  if (data.length == 0) {
    $("label[2]").hidden = false;
  } else {
    $("label[2]").hidden = true;
  }
  if (re === 1) {
    return names;
  } else {
    return data;
  }
};

const appInfo = (index, appName, scheme) => {
  let data;
  if ($("view[1]").hidden != true) {
    data = favorData();
  } else {
    data = $cache.get("channels");
  }
  const url = data[index.item].url;
  $app.openURL(scheme + url);
  $delay(1, () => {
    $ui.toast("无法打开 " + appName);
    $device.taptic(1);
    $delay(0.15, () => {
      $device.taptic(1);
    });
  });
};

$app.rotateDisabled = true;
$ui.loading(true);
const key = $cache.get("switch").url;
if ($cache.get("switch").id == "feed") {
  $http.request({
    method: "GET",
    url: key,
    timeout: 10,
    handler: resp => {
      let data = [];
      const request = resp.data;
      try {
        if (request.indexOf("#EXTM3U") != -1) {
          const reg = RegExp(/^(\n+)?^(\s+)?^(\r+)?#EXTM3U.*(\r+)?(\n+)?|#EXTINF.*,(\s+)?|(\n+)?$(\s+)?$(\r+)?$/g);
          const replace = request.replace(reg, "");
          const list = replace.split(/\n/g);
          const name = [];
          const url = [];
          for (let i = 0; i < list.length; i++) {
            if (i % 2 == 0) {
              name.push(list[i]);
            } else {
              url.push(list[i]);
            }
          }
          const merge = (key, val) => {
            const result = [];
            for (let i = 0; i < key.length; i++) {
              const arr = {};
              for (let j = 0; j < val.length; j++) {
                if (i === j) {
                  arr.name = key[i];
                  arr.url = val[j];
                  result.push(arr);
                }
              }
            }
            return result;
          };
          data = merge(name, url);
        } else if (typeof request == "object" && request[(0, request.length - 1)].hasOwnProperty("name", "url")) {
          try {
            data = request;
          } catch (e) {
            return false;
          }
        }
      } catch (e) {
        const obj = request.hasOwnProperty("channel") || request.hasOwnProperty("channels");
        const arr = request.channel || request.channels;
        if (obj && arr[(0, arr.length - 1)].hasOwnProperty("name", "url")) {
          data = arr;
        } else {
          $ui.alert({
            title: "提示",
            message: "无法解析此订阅源\n不支持的内容或文件不正确",
            actions: [
              {
                title: "好的",
                handler: () => {
                  $cache.remove("switch");
                  $addin.restart();
                }
              }
            ]
          });
          return false;
        }
      }
      events(data);
      setData(data);
      if (resp.error != null) {
        const description = resp.error.localizedDescription.replace(/。/g, "");
        $delay(0.3, () => {
          $ui.toast(description);
          $device.taptic(1);
          $delay(0.15, () => {
            $device.taptic(1);
          });
        });
      } else if (data.length == 0) {
        $ui.alert({
          title: "提示",
          message: "无法获取该订阅内容\n订阅源不存在或订阅地址已更改",
          actions: [
            {
              title: "好的"
            }
          ]
        });
      } else {
        $cache.set("channels", data);
        $delay(0.3, () => {
          $ui.toast(`此订阅一共收录了 ${data.length} 个播放源`);
          $device.taptic(1);
        });
      }
    }
  });
} else {
  $http.request({
    method: "GET",
    url: $text.base64Decode(key),
    timeout: 10,
    handler: resp => {
      const request = resp.data;
      const cache = $cache.get("channels");
      const raw = typeof request != "object";
      let data = raw ? cache : request;
      if (data == undefined) {
        data = [];
      }
      if (resp.error != null) {
        const description = resp.error.localizedDescription.replace(/。/g, "");
        $delay(0.3, () => {
          $ui.toast(description);
          $device.taptic(1);
          $delay(0.15, () => {
            $device.taptic(1);
          });
        });
      } else if (typeof request != "object") {
        $delay(0.3, () => {
          $ui.toast("无法获取数据");
          $device.taptic(1);
          $delay(0.15, () => {
            $device.taptic(1);
          });
        });
      } else {
        let label;
        if ($cache.get("switch").id == "live") {
          label = "个直播源";
        } else {
          label = "部影片";
        }
        $cache.set("channels", request);
        $delay(0.3, () => {
          $ui.toast(`目前一共收录了 ${data.length} ${label}`);
          $device.taptic(1);
        });
      }
      events(data);
      setData(data);
    }
  });
}
