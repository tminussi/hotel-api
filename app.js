require('./api/data/db');
var express = require('express');
var PORT = process.env.PORT || 3000;
var app = express();
var routes = require('./api/routes');
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(PORT, function () {
    console.log('express running on ' + PORT);
});