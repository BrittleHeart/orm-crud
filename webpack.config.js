const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './server.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'server.bundle.js',
        publicPath: './public/'
    },
    externals: [nodeExternals()],
    target: 'node',
    mode: 'production',
    module: {
        rules: [
            {test: /^.js$/, use: ['babel-laoder']}
        ]
    }
}