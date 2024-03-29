import { HttpUtilities } from "../index.js";

let options = HttpUtilities.requestOptions('127.0.0.1', 9000, '/system/long-request');
options.timeout = 1000;

HttpUtilities.getPromise(options).then(function (result) {
    console.log('Successful request1 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log(result);
}).catch(error => {
    console.log('Failed request1 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log('Catch error:', error);
});

options.timeout = 7000;

HttpUtilities.getPromise(options).then(function (result) {
    console.log('Successful request2 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log(result);
}).catch(error => {
    console.log('Failed request2 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log('Catch error:', error);
});

options.path = '/system/httpstatus?status=400';

HttpUtilities.getPromise(options).then(function (result) {
    console.log('Successful request3 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log(result);
}).catch(error => {
    console.log('Failed request3 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log('Catch error:', error);
});

options.path = '/system/404';

HttpUtilities.getPromise(options).then(function (result) {
    console.log('Successful request4 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log(result);
}).catch(error => {
    console.log('Failed request4 cost:', new Date().getTime() - options.timestamp, 'milliseconds.');
    console.log('Catch error:', error);
});

console.log("OK!");