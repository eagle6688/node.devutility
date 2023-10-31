import scriptUtilities from "utilities-script";
console.log("Start complieTest...", "\n");

let result = scriptUtilities.compileTs("let x: string  = 'string'", {
    "compilerOptions": {
        "noImplicitUseStrict": true,
        "module": "none",
        "sourceMap": true,
        "allowJs": true
    }
});

console.log(result);
console.log(result['outputText']);
console.log("Finished complieTest.");