const utilities = require("../index");
const data = require("./data");

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    console.log(utilities.findOne(data.students, comparator));
}

test({
    id: 1
});

test({
    id: 3
});