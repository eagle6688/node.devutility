import collectionUtils from "utilities-collection";
import data from "./data.js";

function test(student) {
    let comparator = function (item) {
        return item.name == student.name;
    };

    console.log(collectionUtils.find(data.students, comparator));
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