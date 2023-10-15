import { HttpUtilities } from "../index.js";

let options = HttpUtilities.requestOptions('127.0.0.1', 9000, '/system/httpstatus?status=400');

async function getSync() {
    let data = await HttpUtilities.syncGet(options);
    console.log(data);

    options.path = '/system/httpstatus?status=200';
    data = await HttpUtilities.syncGet(options);
    console.log(data);

    let data2 = await HttpUtilities.getPromise(options).catch(error => {
        console.log(error);
    });

    //undefined if catched error.
    console.log(data2);
}

getSync();

HttpUtilities.getPromise(options).then(function (result) {
    console.log(result);
    throw new Error("Test");
}).catch(error => {
    console.log(error);
});

console.log("OK!");