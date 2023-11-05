module.exports = {
    port: 8002,
    views: "views",
    hbs: {
        defaultLayout: "layout"
    },
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
    },
    copy: [
        {
            source: "resources/styles",
            target: "dist/styles1"
        }
    ],
    webpack: {
        mode: "development"
    }
};