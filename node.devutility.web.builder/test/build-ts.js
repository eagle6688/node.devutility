
const builder = require("../index");
const config = require("./config");
builder(config).build_ts();

const webpack = require('webpack');
webpack(require("../webpack.config"));