import devCollection from "../index.js";
import data from "./data.js";

function test(value) {
    console.log(devCollection.index(data.numbers, value));
}

test(1);
test('2');
test(9);