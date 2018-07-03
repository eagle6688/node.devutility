const config = require("../../webbuilder.config");
const webBuilder = require("utilities-web-builder")(config);
webBuilder.build_fonts();
webBuilder.build_images();