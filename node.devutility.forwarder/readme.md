# node.devutility.forwarder

## Install

``` bash
npm install utilities-forwarder
```

## Usage

### Version 1.1.x

``` javascript
// Import default module
import HttpProxyHelper from "utilities-forwarder";
let httpProxyHelper = new HttpProxyHelper(options);

// Import named module
import { HttpProxyHelper } from "utilities-forwarder"
let httpProxyHelper = new HttpProxyHelper(options);
```

### Version 1.0.x

``` javascript
const forwarder = require("utilities-forwarder")(options);
```

## Configuration

> Value of `options`: <https://github.com/nodejitsu/node-http-proxy>

* `debug`: The forwarder will print more detailed log while enable this item;
* `proxyOptions`: Configuration object for `http-proxy`.

## Change list

### Version 1.1.1

* 1. Add item in configuration object: `debug`;
* 2. Remove support for Web Socket forward and remove related methods `proxyReqWs` and `openWs`;
* 3. Optmize log with Logger from module `utilities-common`.

### Version 1.1.0

* 1. Upgrade javascript to ES 6;
* 2. Add methods in configuration object: `proxyReq`, `proxyRes`, `close`, `error`, `proxyReqWs`, `openWs`.
