/**
 * Compile typescript files and integrate into one javascript file for each page.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const webpack = require('webpack');
const ioUtilities = require("utilities-io");

module.exports = function (configer) {
    let config = configer.options;
    let entry = configer.getEntry();

    if (!entry) {
        return;
    }

    config.webpack.entry = entry;
    config.webpack.output = configer.getOutput();

    let scriptDirectory = configer.getScriptDeployDirectory();
    ioUtilities.createDirectory(scriptDirectory);

    webpack(config.webpack, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.log(err);
        }
    });
};