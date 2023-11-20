/**
 * Copy files or entire directory to target path.
 * If target path is a file, this module would overwrite it.
 * If target path is a directory, this module would copy "source" path into it.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import { Logger } from "utilities-common";
import ioUtilities from "utilities-io";
import CopyValidator from "../validator/complie/CopyValidator.js";

class Builder {
    static logger = Logger.create("node.devutility.web.builder/bin/builder/CopyBuilder.js");

    static build(handler) {
        this.logger.info("Start handling 'copy' section...");

        CopyValidator.verify(handler);
        this.#build(handler);

        this.logger.info("Handle 'copy' section completed.");
    }

    static #build(handler) {
        let options = handler.getOptions();
        let array = options.copy;

        for (let index in array) {
            let item = array[index];

            if (item.source && item.target) {
                ioUtilities.copy(item.source, item.target);
                Builder.logger.info("Copy source", item.source, "to", item.target);
            }
        }
    }
}

export default Builder;