# node.devutility.web.builder

## Install

``` bash
npm install utilities-web-builder
```

## Usage

### Version 1.3.x

``` javascript
// Import default module
import WebBuilder from "utilities-web-builder";

// Import named module
import { WebBuilder } from "utilities-web-builder";

// Create instance
const webBuilder = WebBuilder.build(config, router);

/**
 * Both of two parameters are optional, you can just use the following command to create the instance.
 * In this way, web builder will find configuration file 'webbuilder.config.cjs' from root directory of project or '$project_directory/conf/webbuilder.config.cjs'.
 * The content of webbuilder.config.cjs can ref Default configuration file in following section. 
 * The parameter 'router' is the URL handler for express.js which also * present in configuration example file.
 */
const webBuilder = WebBuilder.build(null, router);

//Start instance
webBuilder.start();
```

### Version 1.2.x

``` javascript
// Require module
const webBuilder = require("utilities-web-builder")(builderConfig, router);

// Start WebSite
webBuilder.start();
```

## Upgrade from 1.2.x to 1.3.x

* 1. Use `import` instead of `require`;
* 2. Rename configuration file from `webbuilder.config.js` to `webbuilder.config.cjs`.

## Change list

### Version 1.3.2

* 1. Add new dependcy `dotenv`;
* 2. Support dynamic port from environment variable `WEB_PORT`, can use the following commands to start with specific port:

``` javascript
// Linux
WEB_PORT=1234 npm run start

// Windows CMD
set WEB_PORT=1234
npm run start

// Windows PowerShell
$env:WEB_PORT=1234
npm run start
```

### Version 1.3.3

* 1. Separate validators for `complie` and `runtime`.

### Version 1.3.1

* 1. Add dependency `utilities-common`;
* 2. Use `Logger` from `utilities-common` to print message;
* 3. Use `BaseValidator` from `utilities-common` for validator.

### Version 1.3.0

* 1. Upgrade javascript to ES 6;
* 2. Optimize codes and restructure folders;
* 3. Rename configuration file from `webbuilder.config.js` to `webbuilder.config.cjs`;
* 4. Remove support for `yargs`;
* 5. Add validators for configuration file.

## Default configuration file

> Refer to <https://github.com/eagle6688/node.devutility/blob/master/node.devutility.web.builder/conf/defaults.js>

## Usage example

> Refer to <https://github.com/eagle6688/node.devutility/tree/master/node.devutility.website>
