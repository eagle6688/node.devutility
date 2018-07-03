/**
 * Bootstrape file for application.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin. All rights reserved.
 */

const builderConfig = require("../webbuilder.config");
const router = require("./server/router");
const webBuilder = require("utilities-web-builder")(builderConfig, router);
webBuilder.start();