/**
 * Node.js webstie build helper.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-19 22:09:00
 * @Copyright: 2018. All rights reserved.
 */

const extend = require("extend");
const config = require("./config");

const ConfigHelper = require("./config-helper");
const Server = require("./server");

const build_fonts = require("./build/build-fonts");
const build_images = require("./build/build-images");
const build_script_lib = require("./build/build-script-lib");
const build_sass = require("./build/build-sass");
const build_ts = require("./build/build-ts");

function Helper(options) {
    this.options = extend(true, {}, config, options);
    this.configHelper = new ConfigHelper(this.options);
}

Helper.prototype.build_fonts = function () {
    build_fonts(this.options);
};

Helper.prototype.build_images = function () {
    build_images(this.options);
};

Helper.prototype.build_scriptLib = function () {
    build_script_lib(this.options);
};

Helper.prototype.build_sass = function () {
    build_sass(this.configHelper);
};

Helper.prototype.build_ts = function () {
    build_ts(this.configHelper);
};

Helper.prototype.configer = function () {
    return this.configHelper;
};

Helper.prototype.start = function () {
    new Server(this.configHelper).start();
};

module.exports = Helper;