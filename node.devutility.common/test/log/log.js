import Logger from "../../lib/log/Logger.js";

let logger = Logger.create();
logger.debug("Hello world!");
logger.info("Hello world!");
logger.warn("Hello world!");
logger.error("Hello world!");

logger.debug("Hello world!", "asd", "qwe");