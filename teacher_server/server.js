/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var logger = require('morgan');
var app = express();
var routes = require('./routers');
var errors_handler = require('./middlewares').errors_handler;
var ResultConstructor = require('./libs').ResultConstructor;
global.config = require('./config.json');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(global.config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: global.config.session_secret,
    resave: true,
    saveUninitialized: true,
    store: new redisStore({
        host: global.config.redis.host,
        port: global.config.redis.port
    }),
    cookie: {maxAge: 1000 * 60 * 60 * 48} //null to create a browser-session
}));

app.use(routes);

app.use(errors_handler);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.statusCode = err.status || 500;
        console.log(err.stack);
        res.json(ResultConstructor.fail(err));
    });
}

app.set_globals = function () {
    global.db = require('./models')(
        global.config.mysql.database,
        global.config.mysql.username,
        global.config.mysql.password,
        global.config.mysql.config
    );
    global.db.sync();
};


module.exports = app;