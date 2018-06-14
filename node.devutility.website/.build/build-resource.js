/**
 * Create directory and copy resources file such as fonts and images to deploy directory.
 */

let path = require("path");
let copyfiles = require('copyfiles');

let config = require("../bin/config");
let ioUtilities = require("../bin/lib/ioUtilities");

ioUtilities.createDirectory(config.directory.deploy.fonts);
ioUtilities.createDirectory(config.directory.deploy.images);
ioUtilities.createDirectory(config.directory.deploy.styles);
ioUtilities.createDirectory(config.directory.deploy.scripts);

copyfiles([getResourcePath("fonts"), config.directory.deploy.fonts], true, function (error) {
    if (error) {
        console.log(error);
    }
});

copyfiles([getResourcePath("images"), config.directory.deploy.images], true, function (error) {
    if (error) {
        console.log(error);
    }
});

function getResourcePath(folder) {
    return path.join("resources", folder, "*");
}