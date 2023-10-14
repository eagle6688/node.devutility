import devCollection from "../index.js";
import data from "./data.js";

function test(student) {
    let comparator = function (item) {
        return item.id == student.id;
    };

    console.log(devCollection.findOne(data.students, comparator));
}

test({
    id: 1
});

test({
    id: 3
});