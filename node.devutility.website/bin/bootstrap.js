/**
 * Bootstrape file for application.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin. All rights reserved.
 */

const webBuilder = require('utilities-web-builder');
const config = require('./config');
const router = require('./server/router');

let builderConfig = config.builderConfig;

builderConfig.server.router = function (app, helper) {
    router(app, helper, config);
};

webBuilder(builderConfig).start();