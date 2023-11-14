/**
 * Bootstrape file for application.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin. All rights reserved.
 */

import WebBuilder from "utilities-web-builder";
import router from "./server/router.js";
WebBuilder.build(null, router).start();