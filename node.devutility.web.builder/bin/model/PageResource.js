/**
 * Page resource class, as a container for resource.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

import collectionUtilities from "utilities-collection";
import PagePartial from "./PagePartial.js";

class PageResource {
    constructor(page) {
        this.page = page;
        this.styles = [];
        this.scriptLibs = [];
        this.scripts = [];
        this.partials = [];
    }

    saveStyle(style) {
        if (collectionUtilities.contain(this.styles, style)) {
            return;
        }

        this.styles.push(style);
    }

    saveScriptLib(script) {
        if (collectionUtilities.contain(this.scriptLibs, script)) {
            return;
        }

        this.scriptLibs.push(script);
    }

    saveScript(script) {
        if (collectionUtilities.contain(this.scripts, script)) {
            return;
        }

        this.scripts.push(script);
    }

    savePartial(name, data) {
        let partial = collectionUtilities.findOne(this.partials, function (item) {
            return item.name == name;
        });

        if (partial) {
            partial.data = data;
            return partial;
        }

        partial = new PagePartial(name, data);
        this.partials.push(partial);
        return partial;
    }
}

export default PageResource;