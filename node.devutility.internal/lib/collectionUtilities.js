/**
 * Collection utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin Su. All rights reserved.
 */

let collectionUtilities = {};

/**
 * Check whether value contains any element belong to array.
 * @param {*} array 
 * @param {*} value 
 */
collectionUtilities.valueContainElement = function (array, value) {
    for (var index in array) {
        let element = array[index];

        if (value.indexOf(element) == 0) {
            return true;
        }
    }

    return false;
};

module.exports = collectionUtilities;