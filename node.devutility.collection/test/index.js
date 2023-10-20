import CollectionUtilities from "../index.js";
import data from "./data.js";

function test(value) {
    console.log(CollectionUtilities.index(data.numbers, value));
}

test(1);
test('2');
test(9);