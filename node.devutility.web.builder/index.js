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

import builder4Copy from "./lib/builder/builder4Copy.js";
import builder4Font from "./lib/builder/builder4Font.js";
import builder4Image from "./lib/builder/builder4Image.js";
import builder4Sass from "./lib/builder/builder4Sass.js";
import builder4Script from "./lib/builder/builder4Script.js";
import builder4Style from "./lib/builder/builder4Style.js";
import builder4TypeScript from "./lib/builder/builder4TypeScript.js";

class WebBuilder {
    constructor(options) {
        this.options = extend(true, {}, defaults, options);
        this.verify();
        this.init();
    }

    static build(options, router) {
        if (!options) {
            let configFile = path.join(process.cwd(), "webbuilder.config.cjs");

            if (fs.existsSync(configFile)) {
                options = createRequire(configFile);
            }
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
        builder4Font.build(this.options);
    }

    build_images() {
        builder4Image.build(this.options);
    }

    build_styleLib() {
        builder4Style.build(this.handler);
    }

    build_scriptLib() {
        builder4Script.build(this.handler);
    }

    build_sass() {
        builder4Sass.build(this.handler);
    }

    build_ts() {
        builder4TypeScript.build(this.handler);
    }

    build_copy() {
        builder4Copy.build(this.options);
    }

    start() {
        this.server.start();
    }
}

export default WebBuilder;