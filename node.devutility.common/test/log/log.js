import * as Common from "../../index.js";

let logger = Common.Logger.create();
logger.debug("Hello world!");
logger.info("Hello world!");
logger.warn("Hello world!");
logger.error("Hello world!");

logger.debug("Hello world!", "asd", "qwe");

logger.debug({
    asd: "Hello world!"
});