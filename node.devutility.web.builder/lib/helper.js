/**
 * Node.js webstie build helper.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-19 22:09:00
 * @Copyright: 2018. All rights reserved.
 */

const extend = require("extend");
const config = require("./config");

const build_fonts = require("./build/build-fonts");
const build_images = require("./build/build-images");
const build_script_lib = require("./build/build-script-lib");

function Helper(options) {
    this.options = extend({}, config, options);
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

};

Helper.prototype.build_ts = function () {

};

module.exports = Helper;