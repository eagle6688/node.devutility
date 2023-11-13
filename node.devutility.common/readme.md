# node.devutility.common

## Install

``` bash
npm install utilities-common
```

## Usage

### Import

``` javascript
// Import default module
import * as Common from "utilities-common";

// Import named module
import { Logger } from "utilities-common";
import { DateTimeFormatter } from "utilities-common";
import { BaseValidator } from "utilities-common";
```

### Logger

``` javascript
let logger = Logger.create("Name of current file.", "yyyy-MM-dd HH:mm:ss.SSS");
logger.debug("Hello world!");
logger.info("Hello world!");
logger.warn("Hello world!");
logger.error("Hello world!");
```

### DateTimeFormatter

``` javascript
let formatter = new DateTimeFormatter("yyyy-MM-dd HH:mm:ss.SSS");
let value = formatter.format(new Date());
```

### BaseValidator

``` javascript
class Validator extends BaseValidator {
    verify(){
        super.require(value, name, prefix);
        super.requireType(value, type, name, prefix);
        super.optionalType(value, type, name, prefix);
    }
}
```
