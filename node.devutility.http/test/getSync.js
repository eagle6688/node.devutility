const utilities = require("../index");
let options = utilities.requestOptions('127.0.0.1', 29302, '/login/getdefaultpage');

async function getSync() {
    let data = await utilities.getPromise(options);
    console.log(data);
}

getSync();

utilities.getPromise(options).then(function (result) {
    console.log(result);
    throw new Error("Test");
}).catch(error => {
    console.log(error);
});

console.log("asd");