const Builder = require("../index");

let config = {
    resources: {
        styles: [
            'resources/styles/bootstrap.min.css',
            'resources/styles/bootstrap-theme.min.css'
        ],
        scripts: [
            'resources/scripts/jquery.min.js',
            'resources/scripts/bootstrap.min.js',
            'resources/scripts/vue.min.js'
        ]
    }
};

let builder = Builder(config);
builder.build_fonts();
builder.build_images();
builder.build_scriptLib();
builder.build_sass();
builder.build_ts();
builder.start();