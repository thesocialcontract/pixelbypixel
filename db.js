/**
 * Created by Caleb on 11/14/2015.
 */
var mysql = require('mysql');

var pool = null;
exports.connect = function(done) {
    pool = mysql.createPool({
        connectionLimit : 100, // TODO: is this really important?
        host     : 'localhost',
        user     : 'root',
        password : 'gPPZu6XzNOiQU957PGBh',
        debug    :  false
    });
    done();
};

exports.get = function() {
    return pool;
};

//exports.fixtures = function(data) {
//    var pool = state.pool
//    if (!pool) return done(new Error('Missing database connection.'))
//
//    var names = Object.keys(data.tables)
//    async.each(names, function(name, cb) {
//        async.each(data.tables[name], function(row, cb) {
//            var keys = Object.keys(row)
//                , values = keys.map(function(key) { return "'" + row[key] + "'" })
//
//            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
//        }, cb)
//    }, done)
//}

//function handle_database(req,res) {
//
//    pool.getConnection(function(err,connection){
//        if (err) {
//            connection.release();
//            res.json({"code" : 100, "status" : "Error in connection database"});
//            return;
//        }
//
//        console.log('connected as id ' + connection.threadId);
//
//        connection.query("select * from mydb.pxbypx",function(err,rows){
//            connection.release();
//            if(!err) {
//                res.json(rows);
//            }
//        });
//
//        connection.on('error', function(err) {
//            res.json({"code" : 100, "status" : "Error in connection database"});
//            return;
//        });
//    });
//}

//app.get("/",function(req,res){-
//    handle_database(req,res);
//});
