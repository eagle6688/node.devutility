/**
 * Bootstrape file for application.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin. All rights reserved.
 */

const webBuilder = require('utilities-web-builder');
const builderConfig = require('./config').builderConfig;
const router = require('./server/router');
webBuilder(builderConfig, router).start();