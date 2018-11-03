/**
 * Default configuration file.
 * 
 * @author: Aldwin Su
 * @Copyright: 2018. All rights reserved.
 */

let defaults = {
    port: 8000, //Website server port.
    views: "app", //Express views directory.
    staticPaths: [], //Static paths need be regitered in express, will automatically add the "deploy.dir".
    hbs: {
        pages: "pages", //Handlebars pages root directory, located in "views".
        partials: "partials", //Handlebars partials root directory, located in "views".
        defaultLayout: "layouts/default" //Default handlebars layout, located in "views".
    },
    resources: {
        fontsDir: "resources/fonts", //Root directory for fonts resource.
        imagesDir: "resources/images", //Root directory for images resource.
        styles: [], //Directories for css files.
        scripts: [] //Directories for javascript files.
    },
    compile: {
        pageStyleNameRegex: /.+(index.scss|index.sass)$/, //Regex for match page main style.
        pageScriptNameRegex: /.+index.ts$/, //Regex for match page main script.
        styleLibName: "libs.bundle.css", //Style file name for whole site, web-builder will package all of css files from "resources.styles" into one css file with this name.
        pageStyleNameFormat: "{page}.min.css", //Style file name format for each page, web-builder will generate one css file for each page with this name format.
        scriptLibName: "libs.bundle.js", //Script file name for whole site, web-builder will package all of javascript files from "resources.scripts" into one javascript file with this name.
        pageScriptNameFormat: "{page}.min.js" //Script file name format for each page, web-builder will generate one javascript file for each page with this name format.
    },
    deploy: {
        /**
         * Two types, 'param' indicates adding 'deploy.version' in each resource url as a parameter, for example: http://127.0.0.1/dist/styles/index.css?v={version}
         * 'prefix' indicates adding 'deploy.version' in each resource file name, for example: http://127.0.0.1/dist/styles/{version}_index.css
         */
        versionedType: "param",
        version: "", //Deploy version, would versioned url if no-empty.
        dir: "dist", //Root directory for target resources, include css files, javascript files, font files and images etc.
        host: "/dist", //Host to access resources in "deploy.dir", maybe a CDN domain. For local resources, please include "deploy.dir", for example, set http://127.0.0.1/dist to access resource like http://127.0.0.1/dist/images/favicon.ico
        favicon: "images/favicon.ico", //Favicon path.
        fontsDir: "fonts", //Directory for fonts, located in "deploy.dir".
        imagesDir: "images", //Directory for images, located in "deploy.dir".
        stylesDir: "stylesheets", //Directory for styles, located in "deploy.dir".
        scriptsDir: "scripts" //Directory for scripts, located in "deploy.dir".
    },
    copy: [
        {
            source: null,
            target: null
        }
    ],
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