/**
 * Collection utilities.
 * 
 * @author: Aldwin Su
 * @date: 2018-06-07 14:54:41
 * @Copyright: 2018 Aldwin Su. All rights reserved.
 */

let utilities = {};

/**
 * Check whether value contains any element belong to array.
 * @param {*} array 
 * @param {*} value 
 */
utilities.valueContainElement = function (array, value) {
    for (var index in array) {
        let element = array[index];

        if (value.indexOf(element) == 0) {
            return true;
        }
    }

    return false;
};

/**
 * Check whether array contains value or not.
 * @param {*} array 
 * @param {*} value 
 */
utilities.contain = function (array, value) {
    for (let index in array) {
        if (array[index] == value) {
            return true;
        }
    }

    return false;
};

module.exports = utilities;