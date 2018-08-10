const utilities = require("../index");
const data = require("./data");

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    console.log(utilities.indexOf(data.students, comparator));
}

test({
    id: 2
});

test({
    id: 4
});

test({
    id: 8
});