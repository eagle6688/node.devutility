var util = require('util');
console.log(util.isDate(new Date()));
console.log(util.isDate(Date()));
console.log(util.isDate({}));
console.log(util.isDate('1900-01-01'));