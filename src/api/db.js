var mysql      = require('mysql');
<<<<<<< HEAD
// var connection = mysql.createConnection({
//   host     : '10.3.131.14',
//   user     : 'myuser',
//   password : '123',
//   database : 'rsorder',
// });
 var pool = mysql.createPool({
    host:'10.3.131.12',
    user:'myuser',
    password:'123',
    database:'rsorder'
});
// connection.connect();

module.exports = {
    insert: function(sql, callback){
      pool.getConnection(function(err,conn){
        if(err){
          callback(err,null,null);
        }else{
          conn.query(sql,function(err,vals,fields){
              //释放连接
              conn.release();
              //事件驱动回调
              err? callback(err) : callback(vals);
          });
        }
      });
    },
    deletes: function(sql, callback){
      pool.getConnection(function(err,conn){
        if(err){
          callback(err,null,null);
        }else{
          conn.query(sql,function(err,vals,fields){
              conn.release();
              err? callback(err) : callback(vals);
          });
        }
      });
    },
    selects: function(sql, callback){
      pool.getConnection(function(err,conn){
        if(err){
          callback(err,null,null);
        }else{
          conn.query(sql,function(err,vals,fields){
              conn.release();
              err? callback(err) : callback(vals);
          });
        }
      });
    },
    update: function(sql, callback){
      pool.getConnection(function(err,conn){
        if(err){
          callback(err,null,null);
        }else{
          conn.query(sql,function(err,vals,fields){
              //释放连接
              conn.release();
              //事件驱动回调
              err? callback(err) : callback(vals);
          });
        }
      });
=======
var connection = mysql.createConnection({
  host     : '10.3.131.14',
  user     : 'myuser',
  password : '123',
  database : 'rsorder'
});
 
connection.connect();

module.exports = {
    insert: function(statement, callback){
      connection.query(statement, function(error, results){
        if(error) throw error;
        callback(results);
      });
      connection.end();
    },
    deletes: function(statement, callback){
      connection.query(statement, function(error, results){
        if(error) throw error;
        callback(results);
      });
      connection.end();
    },
    selects: function(statement, callback){
      connection.query(statement, function(error, results){
          if(error) throw error;
          callback(results);
      });
      connection.end();
    },
    update: function(statement, callback){
      connection.query(statement, function(error, results){
        if(error) throw error;
        callback(results);
      });
      connection.end();
>>>>>>> 5fbf827b87f02403e7026eb4aee9326f644bf47b
    }
}