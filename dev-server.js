var path = require('path');
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require(`./webpack.config.js`);
var httpProxy = require('http-proxy');
var open = require('open');
var proxy = httpProxy.createProxyServer({
    changeOrigin: true
});
var args = require('minimist')(process.argv);
var port = args['p'] || 3000;
var host = args['h'] || 'localhost';

var compiler = webpack(config);

var serverOptions = {
    hot: true,
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
        assets      : false,
        colors      : true,
        version     : false,
        hash        : false,
        timings     : true,
        chunks      : false,
        chunkModules: false
    }
};

app.use(require('webpack-dev-middleware')(compiler, serverOptions));

app.use('/img', express.static('./src/public/img'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, `./src/public/index.html`));
});

app.get('/maps/*', function(req, res){
    proxy.web(req, res, { target: 'https://maps.googleapis.com' });
});

app.listen(port, host, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    open('http://' + host + ':' + port);
    console.log('Listening at http://' + host + ':' + port);
});
