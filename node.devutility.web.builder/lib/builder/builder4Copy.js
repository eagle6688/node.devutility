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
            let entry = array[index];

            if (entry.source && entry.target) {
                ioUtilities.copy(entry.source, entry.target);
                console.log("Copy source", entry.source, "to", entry.target);
            }
        }
    }
}

export default Builder;