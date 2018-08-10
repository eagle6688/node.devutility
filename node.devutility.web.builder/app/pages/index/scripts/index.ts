import base from "../../../scripts/base";

function test() {
    base.sayHello("James");
}

(() => {
    test();
})();