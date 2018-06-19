/**
 * Node.js webstie build helper.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-19 22:09:00
 * @Copyright: 2018. All rights reserved.
 */

const extend = require("extend");
const config = require("./config");

function Helper(options) {
    this.options = extend({}, config, options);
}

Helper.prototype.build_fonts = function () {

};

Helper.prototype.build_images = function () {

};

Helper.prototype.build_scriptLib = function () {

};

Helper.prototype.build_sass = function () {

};

Helper.prototype.build_ts = function () {

};

module.exports = Helper;