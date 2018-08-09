/**
 * Default configuration file.
 */

let defaults = {
    port: 8000,
    hbs: {
        dir: "app",
        pages: "app/pages",
        partials: "app/partials",
        defaultLayout: "",
        staticPaths: ["/dist"]
    },
    resources: {
        fontsDir: "resources/fonts",
        imagesDir: "resources/images",
        styles: [],
        scripts: []
    },
    compile: {
        pageStyleNameRegex: /.+(index.scss|index.sass)$/,
        pageScriptNameRegex: /.+index.ts$/,
        styleLibName: "libs.bundle.css",
        pageStyleNameFormat: "{page}.min.css",
        scriptLibName: "libs.bundle.js",
        pageScriptNameFormat: "{page}.min.js"
    },
    deploy: {
        host: "/",
        favicon: "dist/images/favicon.ico",
        fontsDir: "dist/fonts",
        imagesDir: "dist/images",
        stylesDir: "dist/stylesheets",
        scriptsDir: "dist/scripts"
    },
    copy: [{ source: null, target: null }],
    webpack: {
        context: process.cwd(),
        entry: {},
        output: {},
        devtool: 'source-map',
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