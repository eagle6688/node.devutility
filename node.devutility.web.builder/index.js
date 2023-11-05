/**
 * utilities-web-builder
 */

import fs from "fs";
import path from "path";
import extend from "extend";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import defaults from "./conf/defaults.js";
import Validator from "./bin/Validator.js";
import Handler from "./bin/Handler.js";
import Server from "./bin/Server.js";
import Container from "./bin/model/Container.js";
import ResourceProvider from "./bin/service/ResourceProvider.js";

import CopyBuilder from "./bin/builder/CopyBuilder.js";
import FontBuilder from "./bin/builder/FontBuilder.js";
import ImageBuilder from "./bin/builder/ImageBuilder.js";
import SassBuilder from "./bin/builder/SassBuilder.js";
import Builder4Script from "./bin/builder/ScriptBuilder.js";
import StyleBuilder from "./bin/builder/StyleBuilder.js";
import TypeScriptBuilder from "./bin/builder/TypeScriptBuilder.js";

class WebBuilder {
    static CONFIG_NAME = "webbuilder.config.cjs";

    constructor(options) {
        this.options = extend(true, {}, defaults, options);
        this.verify();
        this.init();
    }

    static build(options, router) {
        if (!options) {
            options = this.getConfiguration();
        }

        if (!options) {
            throw new Error("Configuration not found!");
        }

        if (!options.server) {
            options.server = {};
        }

        if (router) {
            options.server.router = router;
        }

        return new WebBuilder(options);
    }

    static getConfiguration() {
        let configPath = path.resolve(this.CONFIG_NAME);

        if (fs.existsSync(configPath)) {
            return require(configPath);
        }

        configPath = path.resolve("conf", this.CONFIG_NAME);

        if (fs.existsSync(configPath)) {
            return require(configPath);
        }

        throw new Error("Configuration file " + this.CONFIG_NAME + " not found!");
    }

    verify() {
        Validator.verify(this.options);
    }

    init() {
        this.handler = new Handler(this.options);
        let resources = ResourceProvider.getPageResources(this.handler, this.options);
        let container = new Container(this.options, resources);
        this.server = new Server(container, this.handler);
    }

    build_fonts() {
        FontBuilder.build(this.options);
    }

    build_images() {
        ImageBuilder.build(this.options);
    }

    build_styleLib() {
        StyleBuilder.build(this.handler);
    }

    build_scriptLib() {
        Builder4Script.build(this.handler);
    }

    build_sass() {
        SassBuilder.build(this.handler);
    }

    build_ts() {
        TypeScriptBuilder.build(this.handler);
    }

    build_copy() {
        CopyBuilder.build(this.options);
    }

    start() {
        this.server.start();
    }
}

export default WebBuilder;