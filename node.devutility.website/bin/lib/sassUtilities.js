/**
 * Sass utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const nodeSass = require('node-sass');
const ioUtilities = require("../bin/lib/ioUtilities");

let sassUtilities = {};

sassUtilities.compile = function (file, data) {
    let result = nodeSass.renderSync({
        file: file,
        data: data,
        outputStyle: 'compressed'
    });
};

module.exports = sassUtilities;