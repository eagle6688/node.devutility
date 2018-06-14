
const path = require("path");
const jsUtilities = require("../bin/lib/jsUtilities");

let projectDirectory = process.cwd();
jsUtilities.compileTs(path.join(projectDirectory, "contents", "sidenav.ts"));