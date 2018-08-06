/**
 * Compile typescript files and integrate into one javascript file for each page.
 */
const webpack = require('webpack');
const ioUtilities = require("utilities-io");

module.exports = function (configHelper) {
    let config = configHelper.options;
    let entry = configHelper.getEntry();

    if (!entry) {
        return;
    }

    config.webpack.entry = configHelper.getEntry();
    config.webpack.output = configHelper.getOutput();
    
    let scriptDirectory = configHelper.getScriptDirectory();
    ioUtilities.createDirectory(scriptDirectory);

    webpack(config.webpack, (err, stats) => {
        if (err || stats.hasErrors()) {
            console.log(err);
        }
    });
};