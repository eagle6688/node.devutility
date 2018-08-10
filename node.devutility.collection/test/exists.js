const collectionUtilities = require("../index");
const array = require("./data");

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    if (collectionUtilities.exists(array, comparator)) {
        console.log(student, 'exists!');
    }
    else {
        console.log(student, 'not exists!');
    }
}

test({
    id: 1
});

test({
    id: 3
});