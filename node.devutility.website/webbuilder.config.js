module.exports = {
    port: 8002,
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
    webpack: {
        mode: "development"
    },
    app: {
        dir: "views",
        pages: "views/pages",
        partials: "views/partials"
    }
};