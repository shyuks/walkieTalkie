// webpack config goes here.
var webpack = require('webpack')
var path = require('path')

// Paths for compiling / bundling
var app_dir = path.resolve(__dirname, 'app')
var bin_dir = path.resolve(__dirname, 'public/build')

// Webpack config
var config = {
    entry: app_dir + '/main.js',
    output: {
        path: bin_dir,
        filename: 'bundle.js'
    },
    watch : true,
    module: {
        loaders: [{
            test: /.js?$/,
            include: app_dir,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}

module.exports = config
