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
