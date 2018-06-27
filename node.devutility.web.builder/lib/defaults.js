/**
 * Default configuration file.
 */

let defaults = {
    port: 8000,
    resources: {
        fontsDir: "resources/fonts",
        imagesDir: "resources/images",
        styles: [],
        scripts: []
    },
    views: {
        dir: "views",
        pages: "views/pages",
        partials: 'views/partials',
        styleNameRegex: /.+(index.scss|index.sass)$/,
        styleNameFormat: "{page}.min.css",
        scriptNameRegex: /.+index.ts$/,
        scriptNameFormat: "{page}.min.js"
    },
    deploy: {
        host: "/",
        favicon: "dist/images/favicon.ico",
        fontsDir: "dist/fonts",
        imagesDir: 'dist/images',
        stylesDir: 'dist/stylesheets',
        scriptsDir: 'dist/scripts',
        scriptsLibName: 'libs.bundle.js'
    },
    webpack: {
        context: process.cwd(),
        entry: {},
        output: {},
        resolve: {
            extensions: [".ts", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            ]
        }
    },
    server: {
        express: null,
        router: function (express, configer) { }
    }
};

module.exports = defaults;