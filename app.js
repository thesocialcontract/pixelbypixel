var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db.js');
var routes = require('./routes/index');
var app = express();

/**
 * Module dependencies.
 */

var debug = require('debug')('pixelbypixel:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


var io = require('socket.io').listen(server.listen(port));
server.on('listening', onListening);
server.on('error', onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

db.connect(function(){return;});
io.sockets.on('connection', function(socket) {


    socket.on('color', function(data){
        // TODO: Escape data
        var queryString = 'INSERT INTO mydb.pxbypx VALUES' + data.coords + ',' + data.color + ',' + data.fbID + ',' + dateTime();
        db.get().query(queryString, function(err) {
            if (err)
                throw err; // TODO catch error
            else
                console.log('Paint Successful');
        })
    });

    socket.on('facebookIDcheck', function(facebookID) {
        var fbID = db.get().escape(facebookID);
        var queryString = 'SELECT * FROM mydb.pxbypx WHERE coordinates = ' + fbID;
        db.get().query(queryString, function(err, results){
            if (err)
                throw err; // TODO Write proper error handling
            else
                socket.emit('reportUserCoords', results);   // TODO: Write HANDLER for checking FB ID
        })
    });

    socket.on('getCoords', function(x, y){
        var coords = db.get().escape(x + ',' + y);
        var queryString = 'SELECT coordinates FROM mydb.pxbypx WHERE coordinates = ' + coords;
        db.get().query(queryString, function(err, results){
            if (err)
                throw err;
            else
                socket.emit('reportCoords', results);
        })
    });

    socket.on('grabEntry', function(x, y){
        var coords = db.get().escape(x + ',' + y);
        var queryString = 'SELECT * FROM mydb.pxbypx WHERE coordinates = ' + coords;
        db.get().query(queryString, function(err, results) {
            if (err)
                throw err;
            else {
                socket.emit('reportEntry', results);
                //socket.on('reportEntry', function(results){
                //    // TODO: modify reportEntry to form JSON data
                //    messages.push(results[0].facebookID);
                //    messages.push(results[0].coordinates);
                //    messages.push(results[0].claimDate);
                //    messages.push(results[0].color);
                //
                //    var html = '';
                //    for(var i=0; i<messages.length; i++) {
                //        html += messages[i] + '<br />';
                //    }
                //    content.innerHTML = html;
                //});
            }
        })
    });


});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.get("/", function(req, res){
    res.render("index");
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = pool;
    next();
});
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
