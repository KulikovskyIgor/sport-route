var path = require('path');
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require(`./webpack.config.js`);

var port = 3000;
var host = "localhost";

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

app.listen(port, host, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://' + host + ':' + port);
});
