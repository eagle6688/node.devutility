import sysPath from "path";
import { IOUtilities } from "../index.js";

console.log("sysPath.resolve(\"asd\"): ", sysPath.resolve("asd"));
console.log(IOUtilities.getDirectory(sysPath.resolve("asd")));
console.log(IOUtilities.getDirectory(sysPath.resolve("asd/test.txt")));
console.log(IOUtilities.getDirectory("asd"));
console.log(IOUtilities.getDirectory("asd/test.txt"));
console.log(sysPath.resolve("d:\\Node Projects\\node.devutility\\node.devutility.io\\asd"));