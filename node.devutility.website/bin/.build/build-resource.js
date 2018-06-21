const config = require("../config");
const webBuilder = require("utilities-web-builder")(config.buildConfig);
webBuilder.build_fonts();
webBuilder.build_images();