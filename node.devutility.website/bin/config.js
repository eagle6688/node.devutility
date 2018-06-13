/**
 * Application configuration file.
 */

let config = {
    compile: {
        jsLibName: 'libs.bundle.js'
    },
    deploy: {
        directory: {
            fonts: 'dist/fonts',
            images: 'dist/images',
            styles: 'dist/stylesheets',
            scripts: 'dist/scripts'
        }
    }
};

module.exports = config;