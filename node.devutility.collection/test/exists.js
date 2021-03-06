const utilities = require("../index");
const data = require("./data");

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    if (utilities.exists(data.students, comparator)) {
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
    id: 4
});