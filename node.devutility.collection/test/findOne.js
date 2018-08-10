const utilities = require("../index");
const array = require("./data");

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    console.log(utilities.findOne(array, comparator));
}

test({
    id: 1
});

test({
    id: 3
});