var mysql      = require('mysql');
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
    }
}