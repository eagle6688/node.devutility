
const path = require("path");

module.exports = {
    mode: "development",
    context: __dirname,
    entry: {
        index: path.resolve('views/pages/index/scripts/index.ts'),
        login: path.resolve('views/pages/login/scripts/index.ts')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('dist')
    },
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
};