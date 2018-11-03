/**
 * Helper methods for customers.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

function Helper(configer) {
    this.configer = configer;
    this.options = configer.options;
    this.resources = require("./main/initializer")(configer);
}

/**
 * Get page data by provided page name.
 * Page is the folder name in "hbs.pages" configuration.
 */
Helper.prototype.getPageData = function (page) {
    return this.resources[page];
};

module.exports = Helper;