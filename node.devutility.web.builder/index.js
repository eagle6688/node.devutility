/**
 * utilities-web-builder
 */

import fs from "fs";
import path from "path";
import extend from "extend";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import defaults from "./conf/defaults.js";
import Validator from "./bin/validator/Validator.js";
import Handler from "./bin/Handler.js";
import Server from "./bin/Server.js";
import Container from "./bin/model/Container.js";
import ResourceProvider from "./bin/service/ResourceProvider.js";

import CopyBuilder from "./bin/builder/CopyBuilder.js";
import FontsBuilder from "./bin/builder/FontsBuilder.js";
import ImagesBuilder from "./bin/builder/ImagesBuilder.js";
import SassBuilder from "./bin/builder/SassBuilder.js";
import StylesBuilder from "./bin/builder/StylesBuilder.js";
import ScriptsBuilder from "./bin/builder/ScriptsBuilder.js";
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
        this.handler = new Handler(this.options);
        Validator.verify(this.handler);
    }

    init() {
        let resources = ResourceProvider.getPageResources(this.handler, this.options);
        let container = new Container(this.options, resources);
        this.server = new Server(container, this.handler);
    }

    build_fonts() {
        FontsBuilder.build(this.handler);
    }

    build_images() {
        ImagesBuilder.build(this.handler);
    }

    build_styleLib() {
        StylesBuilder.build(this.handler);
    }

    build_scriptLib() {
        ScriptsBuilder.build(this.handler);
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