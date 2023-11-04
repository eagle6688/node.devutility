/**
 * utilities-web-builder
 */

import fs from "fs";
import path from "path";
import extend from "extend";
import { createRequire } from "module";

import defaults from "./conf/defaults.js";
import Validator from "./lib/Validator.js";
import Handler from "./lib/Handler.js";
import Server from "./lib/Server.js";
import Container from "./lib/model/Container.js";
import ResourceProvider from "./lib/service/ResourceProvider.js";

import Builder4Copy from "./lib/builder/Builder4Copy.js";
import Builder4Font from "./lib/builder/Builder4Font.js";
import Builder4Image from "./lib/builder/Builder4Image.js";
import Builder4Sass from "./lib/builder/Builder4Sass.js";
import Builder4Script from "./lib/builder/Builder4Script.js";
import Builder4Style from "./lib/builder/Builder4Style.js";
import Builder4TypeScript from "./lib/builder/Builder4TypeScript.js";

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
            return createRequire(configPath);
        }

        configPath = path.resolve(this.CONFIG_NAME);

        if (fs.existsSync(configPath)) {
            return createRequire(configPath);
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
        Builder4Font.build(this.options);
    }

    build_images() {
        Builder4Image.build(this.options);
    }

    build_styleLib() {
        Builder4Style.build(this.handler);
    }

    build_scriptLib() {
        Builder4Script.build(this.handler);
    }

    build_sass() {
        Builder4Sass.build(this.handler);
    }

    build_ts() {
        Builder4TypeScript.build(this.handler);
    }

    build_copy() {
        Builder4Copy.build(this.options);
    }

    start() {
        this.server.start();
    }
}

export default WebBuilder;