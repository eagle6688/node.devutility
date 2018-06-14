/**
 * Sass utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

const fs = require('fs');

const nodeSass = require('node-sass');
const CleanCSS = require('clean-css');
const cssMinify = new CleanCSS();

let styleUtilities = {
    commentFormat: "/*!\n * Sass file: {file}\n */\n"
};

styleUtilities.getComment = function (file) {
    return styleUtilities.commentFormat.replace(/{file}/, file);
};

styleUtilities.compile = function (file, data) {
    return nodeSass.renderSync({
        file: file,
        data: data,
        outputStyle: 'compressed'
    });
};

styleUtilities.compress = function (file) {
    let content = fs.readFileSync(file, 'utf8');

    if (/.+\.min\.css$/.test(file)) {
        return content;
    }

    return cssMinify.minify(content);
};

module.exports = styleUtilities;