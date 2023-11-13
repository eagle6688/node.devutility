import { DateTimeFormatter } from "../../index.js";

let formatter1 = new DateTimeFormatter('yyyy-MM-dd HH:mm:ss.SSS');
console.log(formatter1.format(new Date()));

var dateTime1 = new Date(2023, 3, 9, 1, 6, 1, 6);
console.log(formatter1.format(dateTime1));