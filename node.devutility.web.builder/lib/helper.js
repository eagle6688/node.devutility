/**
 * Node.js webstie build helper.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-19 22:09:00
 * @Copyright: 2018. All rights reserved.
 */

const extend = require("extend");
const defaults = require("./defaults");

const ConfigHelper = require("./classes/ConfigHelper");
const Server = require("./server");

function Helper(options) {
    this.options = extend(true, {}, defaults, options);
    this.configHelper = new ConfigHelper(this.options);
}

Helper.prototype.build_fonts = function () {
    require("./build/build-fonts")(this.options);
};

Helper.prototype.build_images = function () {
    require("./build/build-images")(this.options);
};

Helper.prototype.build_styleLib = function () {
    require("./build/build-style-lib")(this.configHelper);
};

Helper.prototype.build_scriptLib = function () {
    require("./build/build-script-lib")(this.options);
};

Helper.prototype.build_sass = function () {
    require("./build/build-sass")(this.configHelper);
};

Helper.prototype.build_ts = function () {
    require("./build/build-ts")(this.configHelper);
};

Helper.prototype.build_copy = function () {
    require("./build/build-copy")(this.configHelper);
};

Helper.prototype.configer = function () {
    return this.configHelper;
};

Helper.prototype.start = function () {
    new Server(this.configHelper).start();
};

module.exports = Helper;