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

### Version 1.3.1

* 1. Upgrade javascript to ES 6;
* 2. Optimize codes and restructure folders;
* 3. Rename configuration file from `webbuilder.config.js` to `webbuilder.config.cjs`;
* 4. Remove support for `yargs`;
* 5. Add validators for configuration file.

## Default configuration file

> Refer to <https://github.com/eagle6688/node.devutility/blob/master/node.devutility.web.builder/conf/defaults.js>

## Usage example

> Refer to <https://github.com/eagle6688/node.devutility/tree/master/node.devutility.website>
