/**
 * Container.
 * 
 * @author: Aldwin Su
 * @Copyright: 2023. All rights reserved.
 */

class Container {
    constructor(options, resources) {
        this.setOptions(options);
        this.setResources(resources);
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