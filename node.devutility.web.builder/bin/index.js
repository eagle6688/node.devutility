#!/usr/bin/env node

import WebBuilder from "../index.js";

const argv = require("yargs").option('f', {
    alias: 'func',
    demand: true,
    describe: 'Function name which need execute, functions: build_fonts, build_images, build_styleLib, build_scriptLib, build_sass, build_ts, start',
    type: 'string'
}).argv;

let funcName = argv.func;
let webBuilder = WebBuilder.build();
let webBuilder_Func = webBuilder[funcName];

if (!webBuilder_Func || typeof webBuilder_Func != "function") {
    throw new Error("Invalid parameter 'func': " + funcName + ", function not found.");
}

webBuilder_Func.call(webBuilder);