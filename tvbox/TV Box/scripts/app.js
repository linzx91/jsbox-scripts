const ui = require("/scripts/ui");
const init = require("/scripts/init");
const player = require("/scripts/player");

const [isIpad, isIpadPro, isIphoneX] = [$device.isIpad, $device.isIpadPro, $device.isIphoneX];

const [colors, theme, themeColor, Spinner, popupGuide, toast, lottie, restore, href, getData, getFeedData, search, setFeed, editFeed, feedViewControl, moveArray, inputFocus, hasTouch, apps, play, options] = [ui.colors, ui.theme, ui.themeColor, ui.Spinner, ui.popupGuide, ui.toast, ui.lottie, init.restore, init.href, init.getData, init.getFeedData, init.search, init.setFeed, init.editFeed, init.feedViewControl, init.moveArray, init.inputFocus, init.hasTouch, player.apps, player.play, player.options];

let isDarkTheme = ui.isDarkTheme;
let source = $cache.get("source");

const navBarButtons = (symbol, object) => {
  return {
    type: "button",
    props: {
      bgcolor: $color("clear")
    },
    layout: make => {
      make.size.equalTo($size(28, 28));
      make.centerY.inset(0);
      make.right.inset(object === 0 ? 0 : object === 1 ? 56 : object === 2 ? 112 : 0);
    },
    views: [
      {
        type: "image",
        props: {
          symbol: symbol,
          tintColor: themeColor[3]
        },
        layout: $layout.fill
      }
    ],
    events: {
      tapped: async () => {
        if (object === 0) {
          if (!$("view[2]").hidden) {
            $("view[2]").relayout();
            $("view[2]").updateLayout(make => make.top.inset(-36));
            $("input[0]").blur();
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("view[2]").alpha = 0;
                $("view[2]").relayout();
                $("blur[4]").alpha = 0;
              },
              completion: () => {
                $("view[2]").hidden = true;
                $("blur[4]").hidden = true;
                $("view[9]").hidden = false;
                $("input[0]").text = "";
                $("matrix[2]").data = [];
              }
            });
          } else {
            if (!$("blur[1]").hidden) {
              $("blur[1]").relayout();
              $("blur[1]").updateLayout(make => make.height.equalTo(0));
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[1]").alpha = 0;
                  $("blur[1]").relayout();
                },
                completion: () => $("blur[1]").hidden = true
              });
            }
            if (!$("blur[0]").hidden) {
              $("blur[0]").relayout();
              $("blur[0]").updateLayout(make => make.height.equalTo(0));
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[0]").alpha = 0;
                  $("blur[0]").relayout();
                },
                completion: () => $("blur[0]").hidden = true
              });
            }
            $("view[2]").relayout();
            $("blur[4]").hidden = false;
            $("view[2]").hidden = false;
            $("input[0]").focus();
            $("view[2]").updateLayout(make => make.top.inset(16));
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[4]").alpha = 1;
                $("view[2]").alpha = 1;
                $("view[2]").relayout();
              }
            });
          }
        } else if (object === 1) {
          if ($("view[1]").hidden) {
            $("matrix[1]").data = await getData(1, 1);
            $("view[1]").relayout();
            $("view[1]").hidden = false;
            $("view[1]").updateLayout((make, view) => make.top.equalTo(view.super).offset(-16));
            $ui.animate({
              duration: 0.4,
              animation: () => {
                $("view[0]").alpha = 0;
                $("view[1]").relayout();
              },
              completion: () => {
                $("view[0]").hidden = true;
                $("view[1]").relayout();
                $("view[1]").updateLayout((make, view) => make.top.equalTo(view.super));
                $ui.animate({
                  duration: 0.25,
                  animation: () => $("view[1]").relayout()
                });
              }
            });
            $("blur[7]").relayout();
            $("blur[7]").updateLayout((make, view) => {
              const windowSize = $ui.window.size;
              const topInset = view.super.next.frame.y + view.super.next.frame.height;
              make.top.inset(topInset + 76);
              make.left.right.inset(8);
              make.bottom.inset(48);
              if (windowSize.width >= 500 && windowSize.height >= 1e3) {
                make.top.inset(topInset + 92);
                make.left.right.inset(48);
              } else if (!(isIpad || isIpadPro || isIphoneX)) {
                make.top.inset(topInset + 60);
                make.bottom.inset(8);
              }
            });
          } else {
            $("view[0]").hidden = false;
            $("view[1]").relayout();
            $("view[1]").updateLayout((make, view) => make.top.equalTo(view.super.frame.height));
            $ui.animate({
              duration: 0.4,
              animation: () => {
                $("view[1]").relayout();
                $("view[0]").alpha = 1;
              },
              completion: () => $("view[1]").hidden = true
            });
            if (!$("stack[0]").hidden) {
              $("stack[0]").hidden = true;
              $("matrix[1]").scrollToOffset($point(0, 0));
            }
          }
        } else if (object === 2) {
          if (!$("blur[0]").hidden) {
            $("blur[0]").relayout();
            $("blur[0]").updateLayout(make => make.height.equalTo(0));
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[0]").alpha = 0;
                $("blur[0]").relayout();
              },
              completion: () => $("blur[0]").hidden = true
            });
          } else {
            if (!$("blur[1]").hidden) {
              $("blur[1]").relayout();
              $("blur[1]").updateLayout(make => make.height.equalTo(0));
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("blur[1]").alpha = 0;
                  $("blur[1]").relayout();
                },
                completion: () => $("blur[1]").hidden = true
              });
            }
            if (!$("view[2]").hidden) {
              $("view[2]").relayout();
              $("view[2]").updateLayout(make => make.top.inset(-36));
              $("input[0]").blur();
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("view[2]").alpha = 0;
                  $("view[2]").relayout();
                  $("blur[4]").alpha = 0;
                },
                completion: () => {
                  $("view[2]").hidden = true;
                  $("blur[4]").hidden = true;
                  $("view[9]").hidden = false;
                  $("input[0]").text = "";
                  $("matrix[2]").data = [];
                }
              });
            }
            $("blur[0]").relayout();
            $("blur[0]").hidden = false;
            $("blur[0]").updateLayout(make => make.height.equalTo(160));
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[0]").alpha = 1;
                $("blur[0]").relayout();
              }
            });
          }
        }
      }
    }
  };
};

const setMainMenu = key => {
  let text, symbol, id, url;
  let [borderWidth, borderColor, textColor, tintColor, bgColor, select] = [0, $color("clear"), themeColor[3], themeColor[3], themeColor[7], true];
  if (key === "live") {
    [text, symbol, id, url] = ["电视直播", "tv", "live", href("/jsbox/tvbox/live.json")];
    if (source.id === "live") [textColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
  } else if (key === "movie") {
    [text, symbol, id, url] = ["影视电影", "film", "movie", href("/jsbox/tvbox/movie.json")];
    if (source.id === "movie") [textColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
  } else if (key === "feed") {
    [text, symbol, id] = ["订阅列表", "rectangle.and.paperclip", "feed"];
    if (source.id === "feed") [textColor, tintColor, bgColor] = [colors[2], colors[2], colors[9]];
  } else if (key === "reward") {
    [text, symbol, borderWidth, borderColor] = ["赞赏作者", "hand.thumbsup", 1, colors[29]];
  }
  return {
    type: "button",
    props: {
      cornerRadius: 8,
      smoothCorners: true,
      userInteractionEnabled: select,
      borderWidth: borderWidth,
      borderColor: borderColor,
      bgcolor: bgColor
    },
    views: [
      {
        type: "image",
        props: {
          symbol: symbol,
          tintColor: tintColor,
          contentMode: 4
        },
        layout: (make, view) => {
          make.size.equalTo($size(22, 22));
          make.left.inset(16);
          make.centerY.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          text: text,
          textColor: textColor,
          font: $font("bold", 16)
        },
        layout: (make, view) => {
          make.height.equalTo(view.super);
          make.right.inset(16);
          make.centerY.equalTo(view.super);
        }
      }
    ],
    events: {
      tapped: async () => {
        if (key === "reward") {
          const windowWidth = $ui.window.frame.width;
          const constraint = windowWidth >= 500 ? 0.175 : 0.125;
          $("view[8]").relayout();
          $("view[8]").hidden = false;
          $("blur[1]").updateLayout(make => make.height.equalTo(0));
          $("blur[5]").relayout();
          $("blur[5]").updateLayout((make, view) => {
            const superWidth = view.super.frame.width;
            make.left.right.inset(superWidth * constraint);
          });
          $("blur[6]").relayout();
          $("blur[6]").updateLayout((make, view) => {
            const superWidth = view.super.frame.width;
            make.left.right.inset(superWidth * constraint);
          });
          $("blur[5]").relayout();
          $("blur[6]").relayout();
          $("blur[5]").scale(0.1);
          $("blur[6]").scale(0.1);
          $ui.animate({
            duration: 0.3,
            animation: () => {
              $("blur[1]").alpha = 0;
              $("blur[1]").relayout();
              $("view[8]").alpha = 1;
              $("blur[5]").alpha = 1;
              $("blur[5]").scale(1);
              $("blur[6]").alpha = 1;
              $("blur[6]").scale(1);
            },
            completion: () => {
              $("blur[1]").hidden = true;
              $ui.animate({
                duration: 0.6,
                animation: () => $("label[3]").alpha = 1
              });
            }
          });
        } else {
          if (url) {
            $cache.set("source", {
              id: id,
              url: url
            });
            $addin.restart();
          } else {
            const viewHeight = Math.round($ui.window.frame.height * 0.7 + 48);
            $("list[0]").data = await getData(2, 1);
            $("blur[1]").relayout();
            $("blur[1]").updateLayout(make => make.height.equalTo(0));
            $("view[3]").hidden = false;
            $("scroll[0]").relayout();
            $("scroll[0]").updateLayout((make, view) => {
              make.height.equalTo(viewHeight);
              make.left.right.inset(0);
              make.bottom.inset(-48);
              view.relayout();
              view.contentSize = $size(0, viewHeight * 2);
              $("blur[8]").relayout();
              $("blur[8]").updateLayout(make => {
                make.size.equalTo(view);
                make.top.equalTo(viewHeight);
                make.left.inset(0);
              });
              view.scrollToOffset($point(0, viewHeight));
            });
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[1]").alpha = 0;
                $("blur[1]").relayout();
              },
              completion: () => {
                $("blur[1]").hidden = true;
                $("blur[0]").relayout();
                $("scroll[0]").updateLayout(make => make.bottom.inset(-64));
                $ui.animate({
                  duration: 0.3,
                  animation: () => $("scroll[0]").relayout()
                });
              }
            });
          }
        }
      }
    }
  };
};

const setThemeMenu = key => {
  let text, symbol, cache;
  let [textColor, tintColor, bgColor, select] = [themeColor[3], themeColor[3], themeColor[7], true];
  if (key === "lightMode") {
    [text, symbol, cache] = ["始终浅色", "sun.min.fill", "lightMode"];
    if (theme === "lightMode") [textColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
  } else if (key === "darkMode") {
    [text, symbol, cache] = ["始终深色", "moon.circle", "darkMode"];
    if (theme === "darkMode") [textColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
  } else if (key === "autoMode") {
    [text, symbol, cache] = ["跟随系统", "circle.lefthalf.fill", "autoMode"];
    if (theme === "autoMode") [textColor, tintColor, bgColor, select] = [colors[2], colors[2], colors[9], false];
  }
  return {
    type: "button",
    props: {
      cornerRadius: 8,
      smoothCorners: true,
      userInteractionEnabled: select,
      bgcolor: bgColor
    },
    views: [
      {
        type: "image",
        props: {
          symbol: symbol,
          tintColor: tintColor,
          contentMode: 4
        },
        layout: (make, view) => {
          make.size.equalTo($size(22, 22));
          make.left.inset(16);
          make.centerY.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          text: text,
          textColor: textColor,
          font: $font("bold", 16)
        },
        layout: (make, view) => {
          make.height.equalTo(view.super);
          make.right.inset(16);
          make.centerY.equalTo(view.super);
        }
      }
    ],
    events: {
      tapped: () => {
        $cache.set("theme", cache);
        $addin.restart();
      }
    }
  };
};

const longPressedMenu = {
  favorite: {
    title: "收藏",
    symbol: "heart",
    handler: async (sender, indexPath) => {
      const data = $cache.get("channels");
      const name = data[indexPath.item].name;
      const src = source.id === "feed" ? data[indexPath.item].url : restore(data[indexPath.item].url);
      const array = {
        name: name,
        url: src
      };
      if (!$file.exists("shared://tvbox")) $file.mkdir("shared://tvbox");
      if (!$file.exists("shared://tvbox/favorites.json")) {
        $file.write({
          data: $data({
            string: JSON.stringify([array])
          }),
          path: "shared://tvbox/favorites.json"
        });
      } else {
        const oldData = await getData(1, 0);
        const newData = [];
        oldData.forEach(item => {
          if (item.name != array.name && item.url != array.url) newData.push(item);
        });
        newData.unshift(array);
        $file.write({
          data: $data({
            string: JSON.stringify(newData)
          }),
          path: "shared://tvbox/favorites.json"
        });
      }
      lottie("heart");
    }
  },
  share: {
    title: "分享",
    symbol: "square.and.arrow.up",
    handler: async (sender, indexPath) => {
      const data = !$("blur[4]").hidden ? await search($("input[0]").text) : !$("view[1]").hidden ? await getData(1, 0) : $cache.get("channels");
      const name = data[indexPath.item].name;
      const url = !$("view[0]").hidden && source.id !== "feed" ? restore(data[indexPath.item].url) : data[indexPath.item].url;
      $share.sheet([url, name]);
    }
  },
  remove: {
    title: "删除",
    symbol: "trash",
    destructive: true,
    handler: async (sender, indexPath) => {
      const data = await getData(1, 0);
      if (!$("stack[0]").hidden) {
        $("stack[0]").hidden = true;
        sender.scrollToOffset($point(0, 0));
      }
      data.splice(indexPath.item, 1);
      $file.write({
        data: $data({
          string: JSON.stringify(data)
        }),
        path: "shared://tvbox/favorites.json"
      });
      await $wait(0.3);
      sender.delete($indexPath(0, indexPath.item));
      sender.data = await getData(1, 1);
      $device.taptic(2);
    }
  }
};

const navigationBar = {
  type: "blur",
  props: {
    style: themeColor[9]
  },
  layout: (make, view) => {
    make.top.left.right.inset(0);
    make.bottom.equalTo(view.prev.top);
  },
  views: [
    {
      type: "view",
      layout: make => {
        make.height.equalTo(44);
        make.left.right.inset(16);
        make.bottom.inset(0);
      },
      views: [
        navBarButtons("magnifyingglass.circle", 0),
        navBarButtons("heart.circle", 1),
        navBarButtons("circle.righthalf.fill", 2),
        {
          type: "button",
          props: {
            type: 1,
            title: "TV Box",
            titleColor: themeColor[3],
            font: $font("bold", 28)
          },
          layout: (make, view) => {
            const textSize = $text.sizeThatFits({
              text: view.title,
              width: view.super.width,
              font: $font("bold", 28)
            });
            make.width.equalTo(textSize.width);
            make.height.equalTo(textSize.height);
            make.left.centerY.inset(0);
          },
          events: {
            ready: async sender => {
              await $wait(!$cache.get("guide_out") ? 15 : 3);
              if (!$cache.get("guide_menu")) {
                popupGuide("guide_menu", sender, "点击此处显示更多功能", colors[26], colors[2], "up");
              }
            },
            tapped: () => {
              if (!$cache.get("guide_menu")) $cache.set("guide_menu", 1);
              if (!$("blur[1]").hidden) {
                $("blur[1]").relayout();
                $("blur[1]").updateLayout(make => make.height.equalTo(0));
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[1]").alpha = 0;
                    $("blur[1]").relayout();
                  },
                  completion: () => $("blur[1]").hidden = true
                });
              } else {
                if (!$("blur[0]").hidden) {
                  $("blur[0]").relayout();
                  $("blur[0]").updateLayout(make => make.height.equalTo(0));
                  $ui.animate({
                    duration: 0.3,
                    animation: () => {
                      $("blur[0]").alpha = 0;
                      $("blur[0]").relayout();
                    },
                    completion: () => $("blur[0]").hidden = true
                  });
                }
                if (!$("view[2]").hidden) {
                  $("view[2]").relayout();
                  $("view[2]").updateLayout(make => make.top.inset(-36));
                  $("input[0]").blur();
                  $ui.animate({
                    duration: 0.3,
                    animation: () => {
                      $("view[2]").alpha = 0;
                      $("view[2]").relayout();
                      $("blur[4]").alpha = 0;
                    },
                    completion: () => {
                      $("view[2]").hidden = true;
                      $("blur[4]").hidden = true;
                      $("view[9]").hidden = false;
                      $("input[0]").text = "";
                      $("matrix[2]").data = [];
                    }
                  });
                }
                $("blur[1]").relayout();
                $("blur[1]").hidden = false;
                $("blur[1]").updateLayout(make => make.height.equalTo(210));
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[1]").alpha = 1;
                    $("blur[1]").relayout();
                  }
                });
              }
            }
          }
        }
      ]
    }
  ]
};

const mainMenu = {
  type: "blur",
  props: {
    id: "blur[1]",
    style: themeColor[10],
    cornerRadius: 12,
    smoothCorners: true,
    alpha: 0,
    hidden: true
  },
  layout: make => {
    make.size.equalTo($size(154, 0));
    make.top.left.inset(16);
  },
  views: [
    {
      type: "stack",
      layout: make => make.edges.inset(10),
      props: {
        spacing: 10,
        axis: 1,
        distribution: 1,
        alignment: 0,
        stack: {
          views: [
            setMainMenu("live"),
            setMainMenu("movie"),
            setMainMenu("feed"),
            setMainMenu("reward")
          ]
        }
      }
    }
  ]
};

const themeMenu = {
  type: "blur",
  props: {
    id: "blur[0]",
    style: themeColor[10],
    cornerRadius: 12,
    smoothCorners: true,
    alpha: 0,
    hidden: true
  },
  layout: make => {
    make.size.equalTo($size(154, 0));
    make.top.right.inset(16);
  },
  views: [
    {
      type: "stack",
      layout: make => make.edges.inset(10),
      props: {
        spacing: 10,
        axis: 1,
        distribution: 1,
        alignment: 0,
        stack: {
          views: [
            setThemeMenu("lightMode"),
            setThemeMenu("darkMode"),
            setThemeMenu("autoMode")
          ]
        }
      }
    }
  ]
};

const searchBarView = {
  type: "view",
  props: {
    id: "view[2]",
    alpha: 0,
    hidden: true
  },
  layout: make => {
    make.height.equalTo(36);
    make.top.inset(-36);
    make.left.right.inset(16);
  },
  views: [
    {
      type: "blur",
      props: {
        style: themeColor[9],
        cornerRadius: 8,
        smoothCorners: true
      },
      layout: (make, view) => {
        make.height.equalTo(view.super);
        make.top.left.inset(0);
        make.right.inset(72);
      },
      views: [
        {
          type: "image",
          props: {
            symbol: "magnifyingglass",
            tintColor: themeColor[8],
            contentMode: 4
          },
          layout: make => {
            make.left.inset(8);
            make.centerY.inset(0);
          },
          events: {
            tapped: sender => sender.next.focus()
          }
        },
        {
          type: "input",
          props: {
            id: "input[0]",
            returnKeyType: 6,
            tintColor: themeColor[3],
            textColor: themeColor[3],
            bgcolor: $color("clear"),
            placeholder: "搜索",
            accessoryView: {}
          },
          layout: (make, view) => {
            make.top.right.bottom.inset(0);
            make.left.equalTo(view.prev.right);
          },
          events: {
            changed: async sender => {
              const data = await search(sender.text);
              $("matrix[2]").data = data.map(item => {return {label: {text: item.name}}});
              $("view[9]").hidden = !data.length ? false : true;
            },
            returned: async sender => {
              sender.blur();
              const data = await search(sender.text);
              $("matrix[2]").data = data.map(item => {return {label: {text: item.name}}});
              $("view[9]").hidden = !data.length ? false : true;
            }
          }
        }
      ]
    },
    {
      type: "blur",
      props: {
        style: themeColor[9],
        cornerRadius: 8,
        smoothCorners: true
      },
      layout: (make, view) => {
        make.width.equalTo(64);
        make.height.equalTo(view.super);
        make.top.right.inset(0);
      },
      views: [
        {
          type: "button",
          props: {
            title: "取消",
            bgcolor: colors[9],
            titleColor: colors[2],
            font: $font("bold", 17)
          },
          layout: $layout.fill,
          events: {
            tapped: () => {
              $("view[2]").relayout();
              $("view[2]").updateLayout(make => make.top.inset(-36));
              $("input[0]").blur();
              $ui.animate({
                duration: 0.3,
                animation: () => {
                  $("view[2]").alpha = 0;
                  $("view[2]").relayout();
                  $("blur[4]").alpha = 0;
                },
                completion: () => {
                  $("view[2]").hidden = true;
                  $("blur[4]").hidden = true;
                  $("view[9]").hidden = false;
                  $("input[0]").text = "";
                  $("matrix[2]").data = [];
                }
              });
            }
          }
        }
      ]
    }
  ]
};

const searchMatrix = {
  type: "blur",
  props: {
    id: "blur[4]",
    style: themeColor[9],
    cornerRadius: 16,
    smoothCorners: true,
    alpha: 0,
    hidden: true
  },
  layout: (make, view) => {
    make.top.equalTo(view.prev.bottom).offset(16);
    make.left.right.inset(16);
    make.bottom.equalTo(view.super.centerY);
  },
  views: [
    {
      type: "view",
      props: {
        id: "view[9]"
      },
      events: {
        ready: sender => {
          sender.updateLayout((make, view) => {
            make.width.equalTo(view.super.frame.height * 0.4);
            make.height.equalTo(view.width);
            make.center.equalTo(view.super);
          });
        }
      },
      views: [
        {
          type: "lottie",
          props: {
            src: "/assets/search.json",
            loop: true,
            contentMode: 1
          },
          layout: $layout.fill,
          events: {
            ready: sender => sender.play()
          }
        }
      ]
    },
    {
      type: "matrix",
      props: {
        id: "matrix[2]",
        columns: 2,
        itemHeight: 48,
        spacing: 16,
        bgcolor: $color("clear"),
        template: [
          {
            type: "label",
            props: {
              cornerRadius: 10,
              smoothCorners: true,
              bgcolor: themeColor[4],
              textColor: themeColor[5],
              align: $align.center,
              font: $font("bold", 17)
            },
            layout: $layout.fill,
            events: {
              ready: sender => {
                sender.super.super.cornerRadius = 10;
                sender.super.super.smoothCorners = true;
              }
            }
          }
        ],
        menu: {
          title: "在其它 App 中打开",
          items: [
            {
              inline: true,
              items: apps
            },
            longPressedMenu.share
          ]
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: async (sender, indexPath) => {
          const data = await search($("input[0]").text);
          const name = data[indexPath.item].name;
          const src = !$("view[0]").hidden && source.id !== "feed" ? restore(data[indexPath.item].url) : data[indexPath.item].url;
          const windowSize = $ui.window.size;
          $("video[0]").relayout();
          $("video[0]").updateLayout(make => make.height.equalTo(windowSize.width >= 500 && windowSize.height >= 1e3 ? 320 : 240));
          $ui.animate({
            duration: 0.4,
            animation: () => $("video[0]").relayout()
          });
          $("video[0]").src = src;
          $("label[0]").text = "";
          const textSize = $text.sizeThatFits({
            text: name,
            width: sender.frame.width - 52,
            font: $font("bold", 14)
          });
          $("view[7]").relayout();
          $("view[7]").updateLayout(make => make.width.equalTo(textSize.width + 20));
          $ui.animate({
            duration: 0.3,
            animation: () => $("view[7]").relayout(),
            completion: () => {
              $("label[0]").text = name;
              const textColor = [isDarkTheme ? colors[22] : colors[24], isDarkTheme ? colors[21] : colors[23]];
              $("label[0]").textColor = source.id === "movie" ? textColor[0] : textColor[1];
            }
          });
          await $wait(0.3);
          $("video[0]").play();
          $("view[2]").relayout();
          $("view[2]").updateLayout(make => make.top.inset(-36));
          $("input[0]").blur();
          $ui.animate({
            duration: 0.3,
            animation: () => {
              $("view[2]").alpha = 0;
              $("view[2]").relayout();
              $("blur[4]").alpha = 0;
            },
            completion: () => {
              $("view[2]").hidden = true;
              $("blur[4]").hidden = true;
              $("view[9]").hidden = false;
              $("input[0]").text = "";
              sender.data = [];
              !$cache.get("guide_play") ? popupGuide("guide_play", $("view[7]"), "如果无法播放，可尝试点击这里", colors[26], colors[2], "down") : null;
              if ($device.networkType === 2) toast($("window"), "exclamationmark.circle.fill", colors[22], "正在使用移动网络播放，请注意流量消耗", 5);
            }
          });
        },
        didEndDragging: sender => {
          if (sender.data.length) $("input[0]").blur();
        }
      }
    }
  ]
};

const playerView = {
  type: "video",
  props: {
    id: "video[0]"
  },
  layout: (make, view) => {
    make.width.equalTo(view.super);
    make.height.equalTo(0);
    make.top.left.inset(0);
  },
  events: {
    ready: sender => {
      const windowSize = $ui.window.size;
      sender.relayout();
      sender.updateLayout(make => make.height.equalTo(windowSize.width >= 500 && windowSize.height >= 1e3 ? 320 : 240));
      $ui.animate({
        duration: 0.4,
        animation: () => sender.relayout()
      });
    }
  }
};

const videoTitleBar = {
  type: "view",
  props: {
    id: "view[7]",
    cornerRadius: 12,
    smoothCorners: true
  },
  layout: (make, view) => {
    make.width.equalTo(0);
    make.height.equalTo(32);
    make.top.equalTo($("video[0]").bottom).offset(8);
    make.centerX.equalTo(view.super);
  },
  events: {
    ready: sender => {
      const textSize = $text.sizeThatFits({
        text: $("label[0]").text,
        width: sender.super.frame.width - 52,
        font: $font("bold", 14)
      });
      sender.relayout();
      sender.updateLayout(make => make.width.equalTo(textSize.width + 20));
      $ui.animate({
        duration: 0.3,
        animation: () => sender.relayout()
      });
    }
  },
  views: [
    {
      type: "blur",
      props: {
        style: themeColor[16],
        alpha: 0
      },
      layout: $layout.fill
    },
    {
      type: "label",
      props: {
        id: "label[0]",
        text: "选择频道开始播放",
        align: $align.center,
        textColor: themeColor[3],
        font: $font("bold", 14),
        autoFontSize: true
      },
      layout: $layout.fill,
      events: {
        tapped: sender => {
          const src = $("video[0]").src;
          src ? ($("video[0]").pause(), play(src, options)) : null;
        },
        longPressed: async info => {
          if (info.sender.text != videoTitleBar.views[1].props.text) {
            const index = await search(info.sender.text);
            const matrix = !$("view[0]").hidden ? $("matrix[0]") : $("matrix[1]");
            if (index != -1) {
              if (!$("stack[0]").hidden) $("stack[0]").hidden = true;
              matrix.scrollTo({
                indexPath: $indexPath(0, index),
                animated: true
              });
              if (!$cache.get("guide_videoTitleBar")) $cache.set("guide_videoTitleBar", 1);
              $device.taptic(1);
              if (!$("view[2]").hidden) {
                $("view[2]").relayout();
                $("view[2]").updateLayout(make => make.top.inset(-36));
                $("input[0]").blur();
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("view[2]").alpha = 0;
                    $("view[2]").relayout();
                    $("blur[4]").alpha = 0;
                  },
                  completion: () => {
                    $("view[2]").hidden = true;
                    $("blur[4]").hidden = true;
                    $("view[9]").hidden = false;
                    $("input[0]").text = "";
                    $("matrix[2]").data = [];
                  }
                });
              }
            }
          }
        },
        themeChanged: (sender, isDarkMode) => {
          const textColor = [isDarkMode ? colors[22] : colors[24], isDarkMode ? colors[21] : colors[23]];
          if ($("video[0]").src) sender.textColor = source.id === "movie" ? textColor[0] : textColor[1];
        }
      }
    }
  ]
};

const mainMatrixView = {
  type: "view",
  props: {
    id: "view[0]"
  },
  layout: (make, view) => {
    make.top.equalTo(view.prev.bottom);
    make.left.right.bottom.inset(0);
  },
  views: [
    {
      type: "lottie",
      props: {
        src: "/assets/network_error.json",
        loop: true,
        contentMode: 1,
        hidden: true
      },
      layout: make => make.edges.inset(64)
    },
    {
      type: "matrix",
      layout: $layout.fill,
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
              cornerRadius: 10,
              smoothCorners: true,
              bgcolor: themeColor[4],
              textColor: themeColor[5],
              align: $align.center,
              font: $font("bold", 17)
            },
            layout: $layout.fill,
            events: {
              ready: sender => {
                sender.super.super.cornerRadius = 10;
                sender.super.super.smoothCorners = true;
              }
            }
          }
        ],
        header: {
          type: "view",
          props: {
            height: 32
          }
        },
        footer: {
          type: "label",
          props: {
            id: "footer[0]",
            height: 32,
            text: "© 所有播放源均来源于网络!",
            textColor: $color("gray"),
            align: $align.center,
            font: $font("bold", 12),
            hidden: true
          }
        },
        menu: {
          title: "在其它 App 中打开",
          items: [
            {
              inline: true,
              items: apps
            },
            longPressedMenu.favorite,
            longPressedMenu.share
          ]
        }
      },
      events: {
        itemLocation: 0,
        ready: async sender => {
          const spinner = new Spinner($("view[0]"), "loadData");
          spinner.start();
          await $wait(0.3);
          sender.data = source.id === "feed" ? await getFeedData() : await getData(0, 1);
          spinner.stop();
          this.itemLocation = sender.frame.height / 10;
          const dataNull = !sender.data.length;
          $("footer[0]").hidden = dataNull ? true : false;
          sender.prev.hidden = dataNull ? false : true;
          dataNull ? (sender.prev.play(), $cache.remove("channels")) : sender.prev.stop();
          if (source.id === "feed" && !dataNull) toast($("window"), "checkmark.circle.fill", colors[26], `该订阅一共收录了 ${sender.data.length} 个播放源`);
        },
        didSelect: async (sender, indexPath) => {
          const data = $cache.get("channels");
          const name = data[indexPath.item].name;
          const src = source.id === "feed" ? data[indexPath.item].url : restore(data[indexPath.item].url);
          if (!$("blur[1]").hidden) {
            $("blur[1]").relayout();
            $("blur[1]").updateLayout(make => make.height.equalTo(0));
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[1]").alpha = 0;
                $("blur[1]").relayout();
              },
              completion: () => $("blur[1]").hidden = true
            });
          }
          if (!$("blur[0]").hidden) {
            $("blur[0]").relayout();
            $("blur[0]").updateLayout(make => make.height.equalTo(0));
            $ui.animate({
              duration: 0.3,
              animation: () => {
                $("blur[0]").alpha = 0;
                $("blur[0]").relayout();
              },
              completion: () => $("blur[0]").hidden = true
            });
          }
          this.itemLocation = parseFloat((sender.contentOffset.y / 10).toFixed(1));
          const windowSize = $ui.window.size;
          $("video[0]").relayout();
          $("video[0]").updateLayout(make => make.height.equalTo(windowSize.width >= 500 && windowSize.height >= 1e3 ? 320 : 240));
          $ui.animate({
            duration: 0.4,
            animation: () => $("video[0]").relayout()
          });
          $("video[0]").src = src;
          $("label[0]").text = "";
          const textSize = $text.sizeThatFits({
            text: name,
            width: sender.frame.width - 52,
            font: $font("bold", 14)
          });
          $("view[7]").relayout();
          $("view[7]").updateLayout(make => make.width.equalTo(textSize.width + 20));
          $ui.animate({
            duration: 0.3,
            animation: () => $("view[7]").relayout(),
            completion: () => {
              $("label[0]").text = name;
              const textColor = [isDarkTheme ? colors[22] : colors[24], isDarkTheme ? colors[21] : colors[23]];
              $("label[0]").textColor = source.id === "movie" ? textColor[0] : textColor[1];
            }
          });
          await $wait(0.3);
          $("video[0]").play();
          await $wait(0.3);
          !$cache.get("guide_play") ? popupGuide("guide_play", $("view[7]"), "如果无法播放，可尝试点击这里", colors[26], colors[2], "down") : null;
          if ($device.networkType === 2) toast($("window"), "exclamationmark.circle.fill", colors[22], "正在使用移动网络播放，请注意流量消耗", 5);
        },
        didScroll: sender => {
          const scrollOffset = parseFloat((sender.contentOffset.y / 10).toFixed(2));
          $("label[0]").prev.alpha = scrollOffset >= 1 ? 1 : scrollOffset <= 0 ? 0 : scrollOffset;
        },
        didEndDragging: async sender => {
          const scrollOffset = parseFloat((sender.contentOffset.y / 10).toFixed(2));
          const viewHeight = sender.frame.height / 10;
          !$cache.get("guide_videoTitleBar") && $("video[0]").src && (scrollOffset >= this.itemLocation + viewHeight || scrollOffset <= this.itemLocation - viewHeight) && await search($("label[0]").text) != -1 ? popupGuide("guide_videoTitleBar", $("view[7]"), `点击播放，长按滚动至当前${source.id === "movie" ? "影片" : "频道"}位置`, colors[26], colors[2], "down") : null;
        }
      }
    }
  ]
};

const favoritesView = {
  type: "view",
  props: {
    id: "view[1]",
    hidden: true
  },
  layout: (make, view) => {
    make.size.equalTo(view.super);
    make.top.equalTo(view.super.bottom);
  },
  views: [
    {
      type: "view",
      layout: (make, view) => make.size.equalTo(view.super),
      events: {
        tapped: () => {
          $("view[0]").hidden = false;
          $("view[1]").relayout();
          $("view[1]").updateLayout((make, view) => make.top.equalTo(view.super.frame.height));
          $ui.animate({
            duration: 0.4,
            animation: () => {
              $("view[1]").relayout();
              $("view[0]").alpha = 1;
            },
            completion: () => $("view[1]").hidden = true
          });
          if (!$("stack[0]").hidden) {
            $("matrix[1]").scrollToOffset($point(0, 0));
            $("stack[0]").hidden = true;
          }
        }
      }
    },
    {
      type: "blur",
      props: {
        id: "blur[7]",
        style: themeColor[9],
        cornerRadius: 16,
        smoothCorners: true
      },
      views: [
        {
          type: "matrix",
          layout: $layout.fill,
          props: {
            id: "matrix[1]",
            columns: 2,
            itemHeight: 48,
            spacing: 14,
            bgcolor: $color("clear"),
            template: [
              {
                type: "label",
                props: {
                  cornerRadius: 10,
                  smoothCorners: true,
                  bgcolor: themeColor[4],
                  textColor: themeColor[5],
                  align: $align.center,
                  font: $font("bold", 17)
                },
                layout: $layout.fill,
                events: {
                  ready: sender => {
                    sender.super.super.cornerRadius = 10;
                    sender.super.super.smoothCorners = true;
                  }
                }
              }
            ],
            menu: {
              title: "在其它 App 中打开",
              items: [
                {
                  inline: true,
                  items: apps
                },
                longPressedMenu.share,
                longPressedMenu.remove
              ]
            }
          },
          events: {
            didSelect: async (sender, indexPath) => {
              const data = await getData(1, 0);
              const name = data[indexPath.item].name;
              const src = data[indexPath.item].url;
              if (!$("blur[1]").hidden) {
                $("blur[1]").relayout();
                $("blur[1]").updateLayout(make => make.height.equalTo(0));
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[1]").alpha = 0;
                    $("blur[1]").relayout();
                  },
                  completion: () => $("blur[1]").hidden = true
                });
              }
              if (!$("blur[0]").hidden) {
                $("blur[0]").relayout();
                $("blur[0]").updateLayout(make => make.height.equalTo(0));
                $ui.animate({
                  duration: 0.3,
                  animation: () => {
                    $("blur[0]").alpha = 0;
                    $("blur[0]").relayout();
                  },
                  completion: () => $("blur[0]").hidden = true
                });
              }
              const windowSize = $ui.window.size;
              $("video[0]").relayout();
              $("video[0]").updateLayout(make => make.height.equalTo(windowSize.width >= 500 && windowSize.height >= 1e3 ? 320 : 240));
              $ui.animate({
                duration: 0.4,
                animation: () => $("video[0]").relayout()
              });
              $("video[0]").src = src;
              $("label[0]").text = "";
              const textSize = $text.sizeThatFits({
                text: name,
                width: sender.frame.width - 52,
                font: $font("bold", 14)
              });
              $("view[7]").relayout();
              $("view[7]").updateLayout(make => make.width.equalTo(textSize.width + 20));
              $ui.animate({
                duration: 0.3,
                animation: () => $("view[7]").relayout(),
                completion: () => {
                  $("label[0]").text = name;
                  const textColor = [isDarkTheme ? colors[22] : colors[24], isDarkTheme ? colors[21] : colors[23]];
                  $("label[0]").textColor = source.id === "movie" ? textColor[0] : textColor[1];
                }
              });
              await $wait(0.3);
              $("video[0]").play();
              await $wait(0.3);
              !$cache.get("guide_play") ? popupGuide("guide_play", $("view[7]"), "如果无法播放，可尝试点击这里", colors[26], colors[2], "down") : null;
              if ($device.networkType === 2) toast($("window"), "exclamationmark.circle.fill", colors[22], "正在使用移动网络播放，请注意流量消耗", 5);
            },
            willBeginDragging: () => {
              if (!$("stack[0]").hidden) $("stack[0]").hidden = true;
            }
          }
        },
        {
          type: "label",
          props: {
            id: "label[1]",
            text: "暂未收藏任何频道",
            textColor: $color("gray"),
            font: $font("bold", 22),
            align: $align.center,
            hidden: true
          },
          layout: (make, view) => make.center.inset(view.super)
        },
        {
          type: "stack",
          layout: make => {
            make.top.left.right.inset(16);
            make.height.equalTo(48);
          },
          props: {
            id: "stack[0]",
            spacing: 16,
            axis: 0,
            distribution: 1,
            alignment: 0,
            hidden: true,
            stack: {
              views: [
                {
                  type: "button",
                  props: {
                    title: "  全部删除",
                    symbol: "trash",
                    cornerRadius: 10,
                    smoothCorners: true,
                    tintColor: colors[2],
                    titleColor: colors[2],
                    bgcolor: colors[14],
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
                            style: 2,
                            handler: async () => {
                              $file.delete("shared://tvbox/favorites.json");
                              $("matrix[1]").scrollToOffset($point(0, contentHeight));
                              $("stack[0]").hidden = true;
                              await $wait(0.5);
                              $("matrix[1]").data = await getData(1, 1);
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
                    symbol: "square.and.pencil",
                    cornerRadius: 10,
                    smoothCorners: true,
                    tintColor: colors[2],
                    titleColor: colors[2],
                    bgcolor: colors[20],
                    font: $font("bold", 17)
                  },
                  events: {
                    tapped: async () => {
                      if ($cache.get("editorVal")) $cache.remove("editorVal");
                      if (!$("blur[1]").hidden) {
                        $("blur[1]").relayout();
                        $("blur[1]").updateLayout(make => make.height.equalTo(0));
                        $ui.animate({
                          duration: 0.3,
                          animation: () => {
                            $("blur[1]").alpha = 0;
                            $("blur[1]").relayout();
                            $("blur[4]").alpha = 0;
                          },
                          completion: () => $("blur[1]").hidden = true
                        });
                      }
                      if (!$("blur[0]").hidden) {
                        $("blur[0]").relayout();
                        $("blur[0]").updateLayout(make => make.height.equalTo(0));
                        $ui.animate({
                          duration: 0.3,
                          animation: () => {
                            $("blur[0]").alpha = 0;
                            $("blur[0]").relayout();
                          },
                          completion: () => $("blur[0]").hidden = true
                        });
                      } else if (!$("view[2]").hidden) {
                        $("view[2]").relayout();
                        $("view[2]").updateLayout(make => make.top.inset(-36));
                        $("input[0]").blur();
                        $ui.animate({
                          duration: 0.3,
                          animation: () => {
                            $("view[2]").alpha = 0;
                            $("view[2]").relayout();
                            $("blur[4]").alpha = 0;
                          },
                          completion: () => {
                            $("view[2]").hidden = true;
                            $("blur[4]").hidden = true;
                            $("view[9]").hidden = false;
                            $("input[0]").text = "";
                            $("matrix[2]").data = [];
                          }
                        });
                      }
                      $("code[0]").text = JSON.stringify(await getData(1, 0), null, 2);
                      $("stack[0]").hidden = true;
                      $("matrix[1]").scrollToOffset($point(0, 0));
                      $("blur[3]").hidden = false;
                      $ui.animate({
                        duration: 0.3,
                        animation: () => $("blur[3]").alpha = 1
                      });
                      $("button[0]").bgcolor = colors[9];
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    },
    {
      type: "blur",
      props: {
        style: themeColor[9],
        circular: true
      },
      layout: (make, view) => {
        make.size.equalTo($size(28, 28));
        make.bottom.equalTo(view.prev.top).offset(-16);
        make.centerX.equalTo(view.super);
      },
      views: [
        {
          type: "button",
          props: {
            symbol: "multiply",
            align: $align.center,
            tintColor: themeColor[12],
            bgcolor: themeColor[11]
          },
          layout: $layout.fill,
          events: {
            tapped: async sender => {
              const data = await getData(1, 0);
              if (!$cache.get("guide_favorite") && data.length) {
                popupGuide("guide_favorite", sender, "长按可以编辑和删除收藏的内容", colors[26], colors[2], "down");
              } else {
                if (!$("stack[0]").hidden) $("matrix[1]").scrollToOffset($point(0, 0));
                $("view[0]").hidden = false;
                $("view[1]").relayout();
                $("view[1]").updateLayout((make, view) => make.top.equalTo(view.super.frame.height));
                $ui.animate({
                  duration: 0.4,
                  animation: () => {
                    $("view[1]").relayout();
                    $("view[0]").alpha = 1;
                  },
                  completion: () => {
                    $("view[1]").hidden = true;
                    $("stack[0]").hidden = true;
                  }
                });
              }
            },
            longPressed: async () => {
              const data = await getData(1, 0);
              if (!$cache.get("guide_favorite")) $cache.set("guide_favorite", 1);
              if (data.length) {
                if ($("stack[0]").hidden) {
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
          }
        }
      ]
    }
  ]
};

const feedList = {
  type: "view",
  props: {
    id: "view[3]",
    hidden: true
  },
  layout: (make, view) => {
    make.size.equalTo(view.super);
    make.top.equalTo(view.super);
  },
  views: [
    {
      type: "view",
      props: {
        id: "view[6]",
        bgcolor: colors[30],
        alpha: 0
      },
      layout: $layout.fill,
      events: {
        tapped: sender => sender.next.scrollToOffset($point(0, 0))
      }
    },
    {
      type: "scroll",
      props: {
        id: "scroll[0]",
        showsHorizontalIndicator: false,
        showsVerticalIndicator: false,
        pagingEnabled: true,
        cornerRadius: 10,
        smoothCorners: true
      },
      events: {
        didScroll: sender => {
          const scrollOffset = parseFloat((sender.contentOffset.y / (sender.frame.height)).toFixed(2));
          const scrollToBottom = sender.contentOffset.y > sender.frame.height;
          $("view[6]").alpha = scrollOffset <= 0 ? 0 : scrollOffset >= 1 ? 1 : scrollOffset;
          $("view[3]").hidden = scrollOffset <= 0 ? true : false;
          sender.alwaysBounceVertical = scrollToBottom ? false : true;
        },
        didEndDecelerating: sender => feedViewControl(sender, 0)
      },
      views: [
        {
          type: "blur",
          props: {
            id: "blur[8]",
            style: themeColor[15],
            cornerRadius: 10,
            smoothCorners: true
          },
          views: [
            {
              type: "list",
              layout: make => {
                make.top.left.right.inset(0);
                make.bottom.inset(63);
              },
              props: {
                id: "list[0]",
                style: 0,
                rowHeight: 48,
                reorder: true,
                showsHorizontalIndicator: false,
                showsVerticalIndicator: false,
                separatorColor: themeColor[11],
                bgcolor: $color("clear"),
                template: {
                  props: {
                    bgcolor: $color("clear")
                  },
                  views: [
                    {
                      type: "image",
                      props: {
                        symbol: "tv",
                        tintColor: themeColor[3],
                        contentMode: 4
                      },
                      layout: make => {
                        make.size.equalTo($size(24, 24));
                        make.left.inset(20);
                        make.centerY.inset(0);
                      }
                    },
                    {
                      type: "label",
                      props: {
                        textColor: themeColor[3]
                      },
                      layout: (make, view) => {
                        make.top.bottom.inset(0);
                        make.left.equalTo(view.prev.right).offset(20);
                        make.right.inset(60);
                      }
                    },
                    {
                      type: "image",
                      props: {
                        id: "mark",
                        symbol: "checkmark",
                        tintColor: colors[4],
                        contentMode: 4,
                        hidden: true
                      },
                      layout: make => {
                        make.size.equalTo($size(24, 24));
                        make.right.inset(20);
                        make.centerY.inset(0);
                      }
                    }
                  ]
                },
                actions: [
                  {
                    title: "delete",
                    handler: async (sender, indexPath) => {
                      const item = indexPath.item;
                      const data = await getData(2, 0);
                      data.splice(item, 1);
                      $file.write({
                        data: $data({
                          string: JSON.stringify(data)
                        }),
                        path: "shared://tvbox/feeds.json"
                      });
                      await $wait(0.3);
                      $("list[0]").data = await getData(2, 1);
                    }
                  },
                  {
                    title: "重新命名",
                    color: colors[5],
                    handler: async (sender, indexPath) => {
                      const data = await getData(2, 0);
                      editFeed.data = {
                        index: indexPath.item,
                        name: data[indexPath.item].name,
                        url: data[indexPath.item].url,
                        data: data[indexPath.item].data
                      };
                      $("input[2]").text = data[indexPath.item].name;
                      $("view[5]").hidden = false;
                      $ui.animate({
                        duration: 0.3,
                        animation: () => $("view[5]").alpha = 1,
                        completion: () => {
                          const y = $ui.window.center.y / 3;
                          $("input[2]").focus();
                          $("blur[10]").relayout();
                          $("blur[10]").updateLayout(make => make.centerY.equalTo(-y));
                          $ui.animate({
                            duration: 0.3,
                            animation: () => $("blur[10]").relayout(),
                            completion: () => $app.autoKeyboardEnabled = true
                          });
                        }
                      });
                    }
                  },
                  {
                    title: "更新",
                    color: colors[26],
                    handler: async (sender, indexPath) => {
                      const spinner = new Spinner("正在更新");
                      spinner.start();
                      const data = await getData(2, 0);
                      const url = data[indexPath.item].url;
                      const oldData = data[indexPath.item].data;
                      const newData = await getData(url);
                      data[indexPath.item].data = newData ? newData : oldData;
                      $file.write({
                        data: $data({
                          string: JSON.stringify(data)
                        }),
                        path: "shared://tvbox/feeds.json"
                      });
                      if (url === source.url) $("matrix[0]").data = await getFeedData(1, indexPath.item, url);
                      spinner.stop();
                      lottie(newData ? "checkmark" : "xmark");
                      if (newData) toast($("window"), "checkmark.circle.fill", colors[26], `更新成功，共计 ${newData.length} 个播放源`);
                    }
                  },
                  {
                    title: "分享",
                    color: colors[4],
                    handler: async (sender, indexPath) => {
                      const data = await getData(2, 0);
                      $share.sheet([data[indexPath.item].url, data[indexPath.item].name]);
                    }
                  }
                ],
                header: {
                  type: "view",
                  props: {
                    height: 68
                  }
                },
                footer: {
                  type: "view",
                  props: {
                    height: isIpad || isIpadPro || isIphoneX ? 49 : 1
                  }
                }
              },
              events: {
                didSelect: async (sender, indexPath) => {
                  const data = await getData(2, 0);
                  const name = data[indexPath.item].name;
                  const url = data[indexPath.item].url;
                  const oldData = data[indexPath.item].data;
                  if (!oldData) {
                    const spinner = new Spinner("正在更新");
                    spinner.start();
                    const newData = await getData(url);
                    data[indexPath.item].data = newData;
                    if (newData) $file.write({
                      data: $data({
                        string: JSON.stringify(data)
                      }),
                      path: "shared://tvbox/feeds.json"
                    });
                    spinner.stop();
                    lottie(newData ? "checkmark" : "xmark");
                    if (!newData) return;
                  }
                  const channels = [
                    await getFeedData(0, indexPath.item, url),
                    await getFeedData(1, indexPath.item, url)
                  ];
                  $cache.set("source", {
                    id: "feed",
                    name: name,
                    url: url
                  });
                  $cache.set("channels", channels[0]);
                  $("matrix[0]").data = channels[1];
                  source.id === "feed" ? ($("matrix[0]").scrollToOffset($point(0, 0)), $("scroll[0]").scrollToOffset($point(0, 0)), toast($("window"), "checkmark.circle.fill", colors[26], `该订阅一共收录了 ${channels[0].length} 个播放源`)) : $addin.restart();
                  source = $cache.get("source");
                },
                reorderBegan: async indexPath => moveArray.data = await getData(2, 0),
                reorderMoved: (fromIndexPath, toIndexPath) => moveArray.index(moveArray.data, fromIndexPath.item, toIndexPath.item),
                reorderFinished: () => {
                  const data = moveArray.data;
                  $file.write({
                    data: $data({
                      string: JSON.stringify(data)
                    }),
                    path: "shared://tvbox/feeds.json"
                  });
                },
                didScroll: sender => {
                  const scrollOffset = parseFloat((sender.contentOffset.y / 10).toFixed(2));
                  sender.next.alpha = scrollOffset <= 0 ? 0 : scrollOffset >= 1 ? 1 : scrollOffset;
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
                  layout: (make, view) => make.center.inset(view.super)
                }
              ]
            },
            {
              type: "blur",
              props: {
                style: themeColor[16],
                alpha: 0
              },
              layout: (make, view) => {
                make.height.equalTo(68);
                make.top.equalTo(view.prev).offset(-0.6);
                make.left.right.inset(-0.6);
              }
            },
            {
              type: "view",
              props: {
                borderWidth: 0.6,
                borderColor: themeColor[11]
              },
              layout: (make, view) => make.edges.equalTo(view.prev),
              views: [
                {
                  type: "button",
                  props: {
                    bgcolor: $color("clear")
                  },
                  layout: make => {
                    make.size.equalTo($size(102, 28));
                    make.left.inset(20);
                    make.centerY.inset(0);
                  },
                  views: [
                    {
                      type: "image",
                      props: {
                        symbol: "plus.app",
                        tintColor: themeColor[3],
                        contentMode: 1
                      },
                      layout: make => {
                        make.size.equalTo($size(24, 24));
                        make.left.centerY.inset(0);
                      },
                    },
                    {
                      type: "label",
                      props: {
                        text: "添加订阅",
                        textColor: themeColor[3],
                        font: $font("bold", 16)
                      },
                      layout: (make, view) => {
                        make.left.equalTo(view.prev.right).offset(10);
                        make.centerY.inset(0);
                      }
                    }
                  ],
                  events: {
                    tapped: () => {
                      $("view[4]").hidden = false;
                      $ui.animate({
                        duration: 0.3,
                        animation: () => $("view[4]").alpha = 1,
                        completion: () => {
                          const y = $ui.window.center.y / 3;
                          const isFeedLink = new RegExp(/^https?:\/\/.+\.(m3u|json|txt)$/).test($clipboard.link);
                          $("input[1]").text = isFeedLink ? $clipboard.link : "";
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
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    circular: true,
                    symbol: "multiply",
                    align: $align.center,
                    tintColor: themeColor[12],
                    bgcolor: themeColor[11]
                  },
                  layout: make => {
                    make.size.equalTo($size(28, 28));
                    make.centerY.inset(0);
                    make.right.inset(20);
                  },
                  events: {
                    tapped: () => $("scroll[0]").scrollToOffset($point(0, 0))
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const addFeedView = {
  type: "view",
  props: {
    id: "view[4]",
    bgcolor: colors[30],
    alpha: 0,
    hidden: true
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
            text: "添加订阅",
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
            placeholder: "仅支持m3u, json, txt订阅格式",
            font: $font(14),
            accessoryView: {}
          },
          layout: (make, view) => {
            make.height.equalTo(32);
            make.centerY.equalTo(view.super);
            make.left.right.inset(16);
          },
          events: {
            ready: sender => inputFocus(sender, $("blur[9]")),
            returned: sender => setFeed()
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
                    touchesBegan: hasTouch.touchesBegan,
                    touchesMoved: hasTouch.touchesMoved,
                    touchesEnded: hasTouch.touchesEnded,
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
                        animation: () => $("view[4]").alpha = 0,
                        completion: () => {
                          $("view[4]").hidden = true;
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
                    touchesBegan: hasTouch.touchesBegan,
                    touchesMoved: hasTouch.touchesMoved,
                    touchesEnded: hasTouch.touchesEnded,
                    tapped: sender => {
                      setFeed();
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
};

const editFeedView = {
  type: "view",
  props: {
    id: "view[5]",
    bgcolor: colors[30],
    alpha: 0,
    hidden: true
  },
  layout: $layout.fill,
  views: [
    {
      type: "view",
      layout: $layout.fill,
      events: {
        tapped: () => {
          $("input[2]").blur();
          $("blur[10]").relayout();
          $("blur[10]").updateLayout((make, view) => make.center.equalTo(view.super));
          $ui.animate({
            duration: 0.3,
            animation: () => $("blur[10]").relayout(),
            completion: () => $app.autoKeyboardEnabled = false
          });
        }
      }
    },
    {
      type: "blur",
      props: {
        id: "blur[10]",
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
            text: "重新命名",
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
            id: "input[2]",
            type: $kbType.default,
            cornerRadius: 8,
            smoothCorners: true,
            borderWidth: 1,
            borderColor: themeColor[11],
            tintColor: themeColor[3],
            textColor: themeColor[3],
            bgcolor: themeColor[7],
            placeholder: "请输入订阅名称",
            font: $font(14),
            accessoryView: {}
          },
          layout: (make, view) => {
            make.height.equalTo(32);
            make.centerY.equalTo(view.super);
            make.left.right.inset(16);
          },
          events: {
            ready: sender => inputFocus(sender, $("blur[10]")),
            returned: sender => editFeed.handler()
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
                    touchesBegan: hasTouch.touchesBegan,
                    touchesMoved: hasTouch.touchesMoved,
                    touchesEnded: hasTouch.touchesEnded,
                    tapped: sender => {
                      sender.bgcolor = $color("clear");
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
                        completion: () => {
                          $("view[5]").hidden = true;
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
                    touchesBegan: hasTouch.touchesBegan,
                    touchesMoved: hasTouch.touchesMoved,
                    touchesEnded: hasTouch.touchesEnded,
                    tapped: sender => {
                      editFeed.handler();
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
};

const codeEditor = {
  type: "blur",
  props: {
    id: "blur[3]",
    style: 16,
    alpha: 0,
    hidden: true
  },
  layout: $layout.fill,
  views: [
    {
      type: "blur",
      props: {
        style: 19,
        cornerRadius: 16,
        smoothCorners: true
      },
      layout: make => {
        make.top.left.right.inset(16);
        if (isIpad || isIpadPro || isIphoneX) {
          make.bottom.inset(160);
        } else {
          make.bottom.inset(112);
        }
      },
      views: [
        {
          type: "code",
          props: {
            id: "code[0]",
            language: "json",
            theme: "night-owl",
            darkKeyboard: true,
            tintColor: colors[2],
            adjustInsets: true,
            lineNumbers: true,
            cornerRadius: 16,
            smoothCorners: true,
            bgcolor: $color("clear"),
            font: $font("JetBrainsMono-Regular", 14),
            keys: ["[", "]", "{", "}", '"', ":", ",", "/", "."]
          },
          layout: $layout.fill,
          events: {
            changed: sender => {
              if (!$cache.get("editorVal")) $cache.set("editorVal", sender.text);
              $("button[0]").bgcolor = colors[31];
            }
          }
        }
      ]
    },
    {
      type: "blur",
      props: {
        style: 19,
        cornerRadius: 16,
        smoothCorners: true
      },
      layout: make => {
        make.height.equalTo(80);
        if (isIpad || isIpadPro || isIphoneX) {
          make.left.right.inset(16);
          make.bottom.inset(64);
        } else {
          make.left.right.bottom.inset(16);
        }
      },
      views: [
        {
          type: "stack",
          layout: make => {
            make.height.equalTo(48);
            make.edges.inset(16);
          },
          props: {
            spacing: 16,
            axis: 0,
            distribution: 1,
            alignment: 0,
            stack: {
              views: [
                {
                  type: "button",
                  props: {
                    id: "button[0]",
                    title: "取消",
                    cornerRadius: 10,
                    smoothCorners: true,
                    font: $font("bold", 17)
                  },
                  events: {
                    tapped: async () => {
                      $("code[0]").blur();
                      const cacheVal = $cache.get("editorVal") && $("code[0]").text != $cache.get("editorVal");
                      const sourceVal = $("code[0]").text != JSON.stringify(await getData(1, 0), null, 2);
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
                              style: 2,
                              handler: () => {
                                $ui.animate({
                                  duration: 0.3,
                                  animation: () => $("blur[3]").alpha = 0,
                                  completion: () => $("blur[3]").hidden = true
                                });
                              }
                            }
                          ]
                        });
                      } else {
                        $ui.animate({
                          duration: 0.3,
                          animation: () => $("blur[3]").alpha = 0,
                          completion: () => $("blur[3]").hidden = true
                        });
                      }
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    title: "完成",
                    cornerRadius: 10,
                    smoothCorners: true,
                    bgcolor: colors[26],
                    font: $font("bold", 17)
                  },
                  events: {
                    tapped: async () => {
                      $("code[0]").blur();
                      const spinner = new Spinner();
                      spinner.start();
                      try {
                        const inputValue = $("code[0]").text.replace(/(^\s*)|(\s*$)/g, "");
                        const arr = inputValue ? JSON.parse($("code[0]").text) : [];
                        $file.write({
                          data: $data({
                            string: JSON.stringify(arr)
                          }),
                          path: "shared://tvbox/favorites.json"
                        });
                        $("matrix[1]").data = await getData(1, 1);
                        await spinner.stop(1);
                        lottie("checkmark");
                        $ui.animate({
                          duration: 1,
                          animation: () => $("blur[3]").alpha = 0,
                          completion: async () => $("blur[3]").hidden = true
                        });
                      } catch (err) {
                        await spinner.stop(0.3);
                        $ui.alert({
                          title: "格式错误",
                          message: "你输入的格式不正确\n请按照 JSON 文件格式进行编辑",
                          actions: [
                            {
                              title: "好的"
                            }
                          ]
                        });
                      }
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
};

const rewardView = {
  type: "view",
  props: {
    id: "view[8]",
    alpha: 0,
    hidden: true
  },
  layout: $layout.fill,
  views: [
    {
      type: "blur",
      props: {
        style: themeColor[14]
      },
      layout: $layout.fill,
      events: {
        tapped: () => {
          $("label[3]").alpha = 0;
          $ui.animate({
            duration: 0.3,
            animation: () => {
              $("blur[6]").alpha = 0;
              $("blur[6]").scale(0.1);
              $("blur[5]").alpha = 0;
              $("blur[5]").scale(0.1);
            },
            completion: () => {
              $ui.animate({
                duration: 0.3,
                animation: () => $("view[8]").alpha = 0,
                completion: () => $("view[8]").hidden = true
              });
            }
          });
        }
      }
    },
    {
      type: "blur",
      props: {
        id: "blur[5]",
        style: themeColor[9],
        cornerRadius: 16,
        smoothCorners: true,
        alpha: 0
      },
      layout: (make, view) => {
        make.height.equalTo(view.width).offset(64);
        make.left.right.equalTo(view.super.centerX);
        make.centerY.equalTo(view.super);
      },
      views: [
        {
          type: "view",
          layout: make => make.edges.inset(8),
          views: [
            {
              type: "image",
              props: {
                id: "image[0]",
                cornerRadius: 10,
                smoothCorners: true,
                bgcolor: $color("clear")
              },
              layout: make => {
                make.top.left.right.inset(0);
                make.bottom.inset(64);
              },
              events: {
                ready: async sender => {
                  const spinner = new Spinner(sender, "loadQRCode");
                  spinner.start();
                  const getImage = await $http.get({
                    url: href("/qrcode.jpeg"),
                    timeout: 5
                  });
                  spinner.stop();
                  if (!getImage.error) {
                    sender.data = getImage.rawData;
                    $cache.set("qr_code", getImage.rawData);
                  } else {
                    sender.data = $cache.get("qr_code");
                  }
                }
              },
              views: [
                {
                  type: "view",
                  props: {
                    bgcolor: colors[30]
                  },
                  layout: $layout.fill,
                  events: {
                    ready: sender => sender.hidden = isDarkTheme ? false : true,
                    themeChanged: (sender, isDarkMode) => sender.hidden = isDarkMode ? false : true
                  }
                }
              ]
            },
            {
              type: "button",
              props: {
                symbol: "qrcode.viewfinder",
                title: "  保存并前往微信扫一扫",
                cornerRadius: 10,
                smoothCorners: true,
                tintColor: colors[2],
                titleColor: colors[2],
                bgcolor: colors[15],
                font: $font("bold", 17)
              },
              layout: (make, view) => {
                make.top.equalTo(view.prev.bottom).offset(16);
                make.left.right.bottom.inset(0);
              },
              events: {
                tapped: () => {
                  $photo.save({
                    data: $("image[0]").data,
                    handler: async success => {
                      if (success) {
                        toast($("window"), "checkmark.circle.fill", colors[26], "二维码已保存到相册，将自动跳转至微信", 3);
                        await $wait(3);
                        $app.openURL("weixin://scanqrcode");
                      }
                    }
                  });
                }
              }
            }
          ]
        }
      ]
    },
    {
      type: "label",
      props: {
        id: "label[3]",
        text: "支持与赞赏",
        align: $align.center,
        shadowColor: colors[3],
        textColor: colors[2],
        font: $font("bold", 28),
        alpha: 0
      },
      layout: (make, view) => {
        make.width.equalTo(view.prev);
        make.height.equalTo(64);
        make.centerX.equalTo(view.super);
        make.bottom.equalTo(view.prev.top).offset(-16);
      }
    },
    {
      type: "blur",
      props: {
        id: "blur[6]",
        style: themeColor[9],
        cornerRadius: 16,
        smoothCorners: true,
        alpha: 0
      },
      layout: (make, view) => {
        make.height.equalTo(64);
        make.top.equalTo(view.prev.prev.bottom).offset(16);
        make.left.right.equalTo(view.super.centerX);
      },
      views: [
        {
          type: "stack",
          layout: make => make.edges.inset(8),
          props: {
            spacing: 8,
            axis: 0,
            distribution: 1,
            alignment: 0,
            stack: {
              views: [
                {
                  type: "button",
                  props: {
                    title: "取消",
                    cornerRadius: 10,
                    smoothCorners: true,
                    titleColor: colors[2],
                    bgcolor: colors[9],
                    font: $font("bold", 17)
                  },
                  events: {
                    tapped: () => {
                      $("label[3]").alpha = 0;
                      $ui.animate({
                        duration: 0.3,
                        animation: () => {
                          $("blur[5]").alpha = 0;
                          $("blur[5]").scale(0.1);
                          $("blur[6]").alpha = 0;
                          $("blur[6]").scale(0.1);
                        },
                        completion: () => {
                          $ui.animate({
                            duration: 0.3,
                            animation: () => $("view[8]").alpha = 0,
                            completion: () => $("view[8]").hidden = true
                          });
                        }
                      });
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    title: "赞赏记录",
                    cornerRadius: 10,
                    smoothCorners: true,
                    titleColor: colors[2],
                    bgcolor: colors[29],
                    font: $font("bold", 17)
                  },
                  events: {
                    tapped: async sender => {
                      const listData = async () => {
                        const resp = await $http.get({
                          url: href("/contributor.json"),
                          timeout: 10
                        });
                        let data = null;
                        if (!resp.error && typeof resp.data === "object") {
                          data = resp.data.map(item => {
                            return {
                              name: {
                                text: item
                              }
                            };
                          });
                        } else {
                          toast($("list[1]"), "xmark.circle.fill", colors[14], "网络出错");
                        }
                        if (data && !data.length) {
                          $("label[4]").text = "暂无数据";
                          $("label[4]").hidden = false;
                        } else if (!data) {
                          $("label[4]").text = "网络出错";
                          $("label[4]").hidden = false;
                        } else {
                          $("label[4]").hidden = true;
                        }
                        return data;
                      };
                      const windowSize = $ui.window.size;
                      const widthConstraint = windowSize.width >= 500 ? 0.55 : 0.75;
                      const heightConstraint = windowSize.height <= 800 ? 0.65 : 0.6;
                      const width = windowSize.width * widthConstraint;
                      const height = windowSize.height * heightConstraint;
                      $ui.popover({
                        sourceView: sender,
                        sourceRect: sender.bounds,
                        directions: $popoverDirection.any,
                        size: $size(width, height),
                        views: [
                          {
                            type: "view",
                            props: {
                              bgcolor: themeColor[4]
                            },
                            layout: $layout.fill
                          },
                          {
                            type: "label",
                            props: {
                              text: "赞赏记录（按时间顺序排列）",
                              textColor: themeColor[13],
                              align: $align.center,
                              font: $font("bold", 14)
                            },
                            layout: make => {
                              make.height.equalTo(40);
                              make.top.left.right.inset(0);
                            }
                          },
                          {
                            type: "list",
                            layout: (make, view) => {
                              make.top.equalTo(view.prev.bottom);
                              make.left.right.bottom.inset(0);
                            },
                            props: {
                              id: "list[1]",
                              style: 1,
                              selectable: false,
                              separatorColor: themeColor[11],
                              bgcolor: $color("clear"),
                              template: {
                                props: {
                                  bgcolor: $color("clear")
                                },
                                views: [
                                  {
                                    type: "image",
                                    props: {
                                      symbol: "person.crop.circle",
                                      circular: true,
                                      tintColor: themeColor[13]
                                    },
                                    layout: (make, view) => {
                                      make.size.equalTo($size(24, 24));
                                      make.left.inset(16);
                                      make.centerY.equalTo(view.super);
                                    }
                                  },
                                  {
                                    type: "label",
                                    props: {
                                      id: "name",
                                      textColor: themeColor[13]
                                    },
                                    layout: (make, view) => {
                                      make.height.equalTo(view.super);
                                      make.top.inset(0);
                                      make.left.equalTo(view.prev.right).offset(16);
                                      make.right.inset(52);
                                    }
                                  },
                                  {
                                    type: "image",
                                    props: {
                                      symbol: "heart.fill",
                                      tintColor: colors[14]
                                    },
                                    layout: (make, view) => {
                                      make.size.equalTo($size(20, 20));
                                      make.right.inset(16);
                                      make.centerY.equalTo(view.super);
                                    }
                                  }
                                ]
                              }
                            },
                            events: {
                              ready: async sender => {
                                const spinner = new Spinner(sender, "loadList");
                                spinner.start();
                                const data = await listData();
                                spinner.stop();
                                if (data) {
                                  sender.data = data;
                                  toast($("list[1]"), "exclamationmark.circle.fill", colors[29], "赞赏之后将会在24小时内公布", 3);
                                  await $wait(2.9);
                                  toast($("list[1]"), "heart.fill", colors[14], "感谢支持！", 2);
                                } else {
                                  sender.data = [];
                                }
                              },
                              pulled: async sender => {
                                const data = await listData();
                                if (data) $("list[1]").data = data;
                                await $wait(0.3);
                                sender.endRefreshing();
                              }
                            },
                            views: [
                              {
                                type: "label",
                                props: {
                                  id: "label[4]",
                                  textColor: $color("gray"),
                                  align: $align.center,
                                  font: $font("bold", 20),
                                  hidden: true
                                },
                                layout: (make, view) => make.center.equalTo(view.super)
                              }
                            ]
                          }
                        ]
                      });
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
};

const exitGuide = {
  type: "view",
  layout: (make, view) => {
    make.size.equalTo($size(1, 1));
    make.left.inset(-1);
    make.centerY.equalTo(view.super);
  },
  events: {
    ready: async sender => {
      if (!$cache.get("guide_out")) {
        await $wait(3);
        popupGuide("guide_out", sender, "从\n边\n缘\n往\n右\n滑\n动\n退\n出", colors[26], colors[2], "left");
      }
    }
  }
};

exports.window = {
  props: {
    id: "window",
    bgcolor: themeColor[2],
    statusBarStyle: themeColor[0],
    multipleTouchEnabled: false,
    navBarHidden: true
  },
  views: [
    {
      type: "view",
      layout: $layout.fill,
      events: {
        themeChanged: (sender, isDarkMode) => isDarkTheme = isDarkMode ? true : false
      },
      views: [
        {
          type: "view",
          layout: (make, view) => {
            make.top.equalTo(view.super.topMargin).offset(36);
            make.left.right.bottom.inset(0);
          },
          views: [
            playerView,
            mainMatrixView,
            favoritesView,
            videoTitleBar,
            searchBarView,
            searchMatrix,
            codeEditor,
            themeMenu,
            mainMenu
          ]
        },
        navigationBar
      ]
    },
    feedList,
    addFeedView,
    editFeedView,
    rewardView,
    exitGuide
  ]
};