const Builder = require("../index");
const config = require("./config");

let builder = Builder(config);
builder.build_fonts();
builder.build_images();
builder.build_scriptLib();
builder.build_sass();
builder.build_ts();
builder.start();