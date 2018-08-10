const utilities = require("../index");
const data = require("./data");

function test(value) {
    if (utilities.contain(data.numbers, value)) {
        console.log('Exists!');
    }
    else {
        console.log('Not exists!');
    }
}

test(1);
test('2');
test(9);