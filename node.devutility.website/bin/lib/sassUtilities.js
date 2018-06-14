/**
 * Sass utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const nodeSass = require('node-sass');

let sassUtilities = {
    commentFormat: "/*!\n * Sass file: {file}\n */\n"
};

sassUtilities.getComment = function (file) {
    return sassUtilities.commentFormat.replace(/{file}/, file);
};

sassUtilities.compile = function (file, data) {
    return nodeSass.renderSync({
        file: file,
        data: data,
        outputStyle: 'compressed'
    });
};

module.exports = sassUtilities;