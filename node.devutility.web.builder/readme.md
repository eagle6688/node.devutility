# node.devutility.web.builder

## Default configuration file

Refer to <https://github.com/eagle6688/node.devutility/blob/master/node.devutility.web.builder/conf/defaults.js>

## Usage example

Refer to <https://github.com/eagle6688/node.devutility/tree/master/node.devutility.website>

## Install

``` bash
npm install utilities-web-builder
```

## Usage

### Version 1.3.x

``` javascript
// Import default module
import webBuilder from "utilities-web-builder";

// Import named module
import { webBuilder } from "utilities-web-builder";
```

### Version 1.2.x

``` javascript
// Require module
const webBuilder = require("utilities-web-builder")(builderConfig, router);
```

## Upgrade from 1.2.x to 1.3.x

* 1. Use `import` instead of `require`;
* 2. Rename configuration file from `webbuilder.config.cjs` to `webbuilder.config.js`;
