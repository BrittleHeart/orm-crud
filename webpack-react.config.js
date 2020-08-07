const path = require('path')

module.exports = {
    entry: './public/index.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'react.bundle.js'
    },
    mode: 'production',
    target: 'web',
    module: {
        rules: [
            {test: /^.js|.jsx$/, use: ['babel-loader']}
        ]
    }
}