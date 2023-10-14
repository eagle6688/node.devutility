import devCollection from "../index.js";
import data from "./data.js";

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    if (devCollection.exists(data.students, comparator)) {
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