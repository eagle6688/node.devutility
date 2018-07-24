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
    app: {
        dir: "app",
        pages: "app/pages",
        partials: 'app/partials',
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
        stylesLibName: 'libs.bundle.css',
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