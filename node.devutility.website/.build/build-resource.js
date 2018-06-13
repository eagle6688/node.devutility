/**
 * Create directory and copy resources file such as fonts and images to deploy directory.
 */

let path = require("path");
let copyfiles = require('copyfiles');

let config = require("../bin/config");
let ioUtilities = require("../bin/lib/ioUtilities");

ioUtilities.createDirectory(config.deploy.directory.fonts);
ioUtilities.createDirectory(config.deploy.directory.images);
ioUtilities.createDirectory(config.deploy.directory.styles);
ioUtilities.createDirectory(config.deploy.directory.scripts);

copyfiles([getResourcePath("fonts"), config.deploy.directory.fonts], true, function (error) {
    if (error) {
        console.log(error);
    }
});

copyfiles([getResourcePath("images"), config.deploy.directory.images], true, function (error) {
    if (error) {
        console.log(error);
    }
});

function getResourcePath(folder) {
    return path.join("resources", folder, "*");
}