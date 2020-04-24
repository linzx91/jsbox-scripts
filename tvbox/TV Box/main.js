"use strict";

const app = require("/scripts/app");
$include("/scripts/data");

$app.env !== $env.app ? $app.openURL(`jsbox://run?name=${$text.URLEncode($addin.current.name)}&location=local`) : $ui.render(app.window);
$app.rotateDisabled = $device.isIpad || $device.isIpadPro ? false : true;