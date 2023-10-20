# node.devutility.forwarder

## Install

``` bash
npm install utilities-forwarder
```

## Usage

``` javascript
// Require module
const forwarder = require("utilities-forwarder")(options);

// Import default module
import HttpProxyHelper from "utilities-forwarder";
let httpProxyHelper = new HttpProxyHelper(options);

// Import named module
import { HttpProxyHelper } from "utilities-forwarder"
let httpProxyHelper = new HttpProxyHelper(options);
```

The options can refer to <https://github.com/nodejitsu/node-http-proxy>
