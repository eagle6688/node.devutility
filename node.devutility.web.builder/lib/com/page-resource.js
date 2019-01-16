/**
 * Page resource class, as a container for resource.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

const collectionUtilities = require("utilities-collection");
const PagePartial = require("./page-partial");

function PageResource(page) {
    this.page = page;
    this.styles = [];
    this.scriptLibs = [];
    this.scripts = [];
    this.partials = [];
}

PageResource.prototype.saveStyle = function (style) {
    if (collectionUtilities.contain(this.styles, style)) {
        return;
    }

    this.styles.push(style);
};

PageResource.prototype.saveScriptLib = function (script) {
    if (collectionUtilities.contain(this.scriptLibs, script)) {
        return;
    }

    this.scriptLibs.push(script);
};

PageResource.prototype.saveScript = function (script) {
    if (collectionUtilities.contain(this.scripts, script)) {
        return;
    }

    this.scripts.push(script);
};

PageResource.prototype.savePartial = function (name, data) {
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
};

module.exports = PageResource;