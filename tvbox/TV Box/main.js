"use strict";

const app = require("/scripts/app");

$app.env !== $env.app ? $app.openURL("jsbox://run?name=" + encodeURI($addin.current.name)) : $ui.render(app.window);

$app.rotateDisabled = $device.isIpad || $device.isIpadPro ? false : true;