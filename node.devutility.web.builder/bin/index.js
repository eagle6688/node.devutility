#!/usr/bin/env node

const webbuilder = require("../index")();

const argv = require("yargs").option('f', {
    alias: 'func',
    demand: true,
    describe: 'Function name which need execute, functions: ',
    type: 'string'
}).argv;

let funcName = argv.func;
let webbuilder_func = webbuilder[funcName];

if (!webbuilder_func || typeof webbuilder_func != "function") {
    throw new Error("Wrong parameter \"func\": " + funcName);
}

console.log("Start executing", funcName);
webbuilder_func();
console.log("Executed", funcName, "completely!");