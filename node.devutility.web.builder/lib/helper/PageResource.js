/**
 * Class for page resource.
 */

function PageResource(page) {
    this.page = page;
    this.styles = [];
    this.scripts = [];
}

PageResource.prototype.saveStyle = function (style) {
    this.styles.push(style);
};

PageResource.prototype.saveScript = function (script) {
    this.scripts.push(script);
};

module.exports = PageResource;