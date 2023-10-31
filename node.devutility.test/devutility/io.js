import sysPath from "path";
import { IOUtilities } from "utilities-io";

console.log(IOUtilities.getDirectory(sysPath.resolve("asd")));
console.log(IOUtilities.getDirectory(sysPath.resolve("asd/test.txt")));

console.log(IOUtilities.getDirectory("asd"));
console.log(IOUtilities.getDirectory("asd/test.txt"));