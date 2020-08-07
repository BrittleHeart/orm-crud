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
            {test: /\.js$|jsx/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /^.(jpg|jpeg|svg|bmp|gif|ttf)$/, use: ['img-loader']},
            {test: /^.css$/, use: ['css-loader', 'style-loader', 'resolve-url-loader']},
            {test: /^.scss$/, use: ['sass-loader', 'style-loader', 'resolve-url-loader']}
        ]
    }
}