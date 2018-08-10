/**
 * Class for page resource.
 */

const collectionUtilities = require("utilities-collection");
const PagePartial = require("./PagePartial");

function PageResource(page) {
    this.page = page;
    this.styles = [];
    this.scripts = [];
    this.partials = [];
}

PageResource.prototype.saveStyle = function (style) {
    if (collectionUtilities.contain(this.styles, style)) {
        return;
    }

    this.styles.push(style);
};

PageResource.prototype.saveScript = function (script) {
    if (collectionUtilities.contain(this.scripts, script)) {
        return;
    }

    this.scripts.push(script);
};

PageResource.prototype.addPartial = function (name, data) {
    let item = new PagePartial(name, data);
    this.partials.push(item);
    return item;
};

module.exports = PageResource;