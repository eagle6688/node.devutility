/**
 * Bootstrape file for application.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin. All rights reserved.
 */

const WebBuilder = require('utilities-web-builder');
const config = require('./config');
WebBuilder(config.buildConfig).start();