const utilities = require("../index");
let options = utilities.requestOptions('127.0.0.1', 9000, '/system/httpstatus?status=400');

async function getSync() {
    let data = await utilities.syncGet(options);
    console.log(data);

    options.path = '/system/httpstatus?status=200';
    data = await utilities.syncGet(options);
    console.log(data);

    let data2 = await utilities.getPromise(options).catch(error => {
        console.log(error);
    });

    console.log(data2); //undefined if catched error.
}

getSync();

utilities.getPromise(options).then(function (result) {
    console.log(result);
    throw new Error("Test");
}).catch(error => {
    console.log(error);
});

console.log("OK!");