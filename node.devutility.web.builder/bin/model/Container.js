/**
 * Container.
 * 
 * @author: Aldwin Su
 * @Copyright: 2023. All rights reserved.
 */

import "dotenv/config";

class Container {
    constructor(options, resources) {
        this.setOptions(options);
        this.setResources(resources);
    }

    getPort() {
        let port = process.env.WEB_PORT;

        if (port) {
            return port;
        }

        if (!this.options) {
            return null;
        }

        return this.options.port;
    }

    setOptions(options) {
        this.options = options;
    }

    getOptions() {
        return this.options;
    }

    setResources(resources) {
        this.resources = resources;
    }

    getResources() {
        return this.resources;
    }

    getPageData(pageName) {
        return this.resources[pageName];
    }
}

export default Container;