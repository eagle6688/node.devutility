const utilities = require("../index");
const data = require("./data");

function test(value) {
    console.log(utilities.index(data.numbers, value));
}

test(1);
test('2');
test(9);