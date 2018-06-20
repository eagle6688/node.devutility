/**
 * Application configuration file example.
 */

let config = {
    resources: {
        fontsDir: "resources/fonts",
        imagesDir: "resources/images",
        styles: [],
        scripts: []
    },
    pages: {
        dir: "views/pages",
        styleNameRegex: /.+(index.scss|index.sass)$/,
        styleNameFormat: "{page}.min.css",
        scriptNameRegex: /.+index.ts$/,
        scriptNameFormat: "{page}.min.js"
    },
    deploy: {
        fontsDir: "dist/fonts",
        imagesDir: 'dist/images',
        stylesDir: 'dist/stylesheets',
        scriptsDir: 'dist/scripts',
        scriptsLibName: 'libs.bundle.js'
    },
    tsConfig: {
        "compilerOptions": {
            "module": "commonjs",
            "target": "es5",
            "allowJs": true
        },
        "exclude": [
            "node_modules"
        ]
    }
};

module.exports = config;