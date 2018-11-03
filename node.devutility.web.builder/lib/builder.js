/**
 * Node.js webstie builder.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const extend = require("extend");
const defaults = require("./defaults");
const Configer = require("./main/configer");
const Server = require("./main/server");

function Builder(options) {
    this.options = extend(true, {}, defaults, options);
    require("./main/config-checker")(this.options);
    this.configer = new Configer(this.options);
}

Builder.prototype.build_fonts = function () {
    require("./build/build-fonts")(this.options);
};

Builder.prototype.build_images = function () {
    require("./build/build-images")(this.options);
};

Builder.prototype.build_styleLib = function () {
    require("./build/build-style-lib")(this.configer);
};

Builder.prototype.build_scriptLib = function () {
    require("./build/build-script-lib")(this.configer);
};

Builder.prototype.build_sass = function () {
    require("./build/build-sass")(this.configer);
};

Builder.prototype.build_ts = function () {
    require("./build/build-ts")(this.configer);
};

Builder.prototype.build_copy = function () {
    require("./build/build-copy")(this.configer);
};

Builder.prototype.configer = function () {
    return this.configer;
};

Builder.prototype.start = function () {
    new Server(this.configer).start();
};

module.exports = Builder;