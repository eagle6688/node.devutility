/**
 * Bootstrape file for application.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin. All rights reserved.
 */

const router = require("./server/router");
const builder = require("utilities-web-builder")(null, router);
builder.build_fonts();
builder.build_images();
builder.build_scriptLib();
builder.build_sass();
builder.build_ts();
builder.start();