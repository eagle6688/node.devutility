const collectionUtilities = require("../index");
let array = [1, 2, 3, 4];

function test(value) {
    if (collectionUtilities.contain(array, value)) {
        console.log('Exists!');
    }
    else {
        console.log('Not exists!');
    }
}

test(1);
test('2');
test(9);