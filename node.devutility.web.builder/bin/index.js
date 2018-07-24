#!/usr/bin/env node

const webbuilder = require("../index")();

const argv = require("yargs").option('f', {
    alias: 'func',
    demand: true,
    describe: 'Function name which need execute, functions: build_fonts, build_images, build_styleLib, build_scriptLib, build_sass, build_ts, start',
    type: 'string'
}).argv;

let funcName = argv.func;
let webbuilder_func = webbuilder[funcName];

if (!webbuilder_func || typeof webbuilder_func != "function") {
    throw new Error("Wrong parameter \"func\": " + funcName);
}

webbuilder_func.call(webbuilder);