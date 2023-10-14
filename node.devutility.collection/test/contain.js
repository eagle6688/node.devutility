import devCollection from "../index.js";
import data from "./data.js";

function test(value) {
    if (devCollection.contain(data.numbers, value)) {
        console.log('Exists!');
    }
    else {
        console.log('Not exists!');
    }
}

test(1);
test('2');
test(9);