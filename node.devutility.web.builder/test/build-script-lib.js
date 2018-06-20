const builder = require("../index");
builder({
    resources: {
        scripts: [
            'resources/scripts/jquery.min.js',
            'resources/scripts/bootstrap.min.js',
            'resources/scripts/vue.min.js'
        ]
    }
}).build_scriptLib();