/**
 * Class for page resource.
 */

const collectionUtilities = require("utilities-collection");

function PageResource(page) {
    this.page = page;
    this.styles = [];
    this.scripts = [];
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

module.exports = PageResource;