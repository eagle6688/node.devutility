import CollectionUtilities from "../index.js";
import data from "./data.js";

function test(student) {
    let comparator = function (item) {
        return item.name == student.name;
    };

    console.log(CollectionUtilities.find(data.students, comparator));
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