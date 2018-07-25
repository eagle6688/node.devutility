const config = require("./config");
let builder = require("../index")(config);
builder.build_fonts();
builder.build_images();
builder.build_styleLib();
builder.build_scriptLib();
builder.build_sass();
builder.build_ts();
builder.start();