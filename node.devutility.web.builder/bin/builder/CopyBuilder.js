/**
 * Copy files or entire directory to target path.
 * If target path is a file, this module would overwrite it.
 * If target path is a directory, this module would copy "source" path into it.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import ioUtilities from "utilities-io";

class Builder {
    static build(options) {
        let array = options.copy;

        for (let index in array) {
            let item = array[index];

            if (item.source && item.target) {
                ioUtilities.copy(item.source, item.target);
                console.log("Copy source", item.source, "to", item.target);
            }
        }
    }
}

export default Builder;