import base from "../../../base/base";

function init() {
    base.sayHello("Index");
}

(() => {
    init();
})();