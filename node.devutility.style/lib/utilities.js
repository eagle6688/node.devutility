/**
 * Sass utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018. All rights reserved.
 */

import fs from "fs";
import nodeSass from "node-sass";
import CleanCSS from "clean-css";

const cssMinify = new CleanCSS();

let utilities = {
    commentFormat: "/*!\n * Style file: {file}\n */\n"
};

utilities.getComment = function (file) {
    return utilities.commentFormat.replace(/{file}/, file);
};

utilities.compile = function (file, data) {
    return nodeSass.renderSync({
        file: file,
        data: data,
        outputStyle: 'compressed'
    });
};

utilities.compress = function (file) {
    let content = fs.readFileSync(file, 'utf8');

    if (/.+\.min\.css$/.test(file)) {
        return content;
    }

    let result = cssMinify.minify(content);
    return result.styles
};

export default utilities;