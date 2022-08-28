const path = require('path')

const browserConfig = {
    devtool: 'source-map',
    entry: './build-babel/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'window',
        },
    },
}

const nodeConfig = {
    devtool: 'source-map',
    entry: './build-babel/index.js',
    output: {
        filename: 'index-node.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'commonjs',
        },
    },
}

module.exports = [browserConfig, nodeConfig]
