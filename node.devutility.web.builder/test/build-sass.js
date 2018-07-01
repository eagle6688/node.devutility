const builder = require("../index");

builder({
    resources: {
        styles: [
            'resources/styles/bootstrap.min.css',
            'resources/styles/bootstrap-theme.min.css'
        ]
    }
}).build_sass();