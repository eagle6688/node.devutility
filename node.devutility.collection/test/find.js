const utilities = require("../index");
const array = require("./data");

function test(student) {
    let comparator = function (item) {
        return item.name == student.name;
    };

    console.log(utilities.find(array, comparator));
}

test({
    name: "Student1"
});

test({
    name: "Student2"
});

test({
    name: "Student3"
});