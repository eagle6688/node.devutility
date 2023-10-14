import devCollection from "../index.js";
import data from "./data.js";

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    console.log(devCollection.indexOf(data.students, comparator));
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