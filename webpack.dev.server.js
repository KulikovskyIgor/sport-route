const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new webpackDevServer(webpack(config), {
    publicPath: config.output.publicPath
}).listen('localhost', '8080', function (err) {
        if (err) {
            console.log(err);
        }

        console.log('Listening http://localhost:8080');
    });
