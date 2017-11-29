var mysql      = require('mysql');
var common = require('../src/common/common.js')
console.log(common)
 var pool = mysql.createPool({
    host:common.sqlUrl,

    user:'myuser',
    password:'123',
    database:'rsorder'
});
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
    update: function(sql,params, callback){
      pool.getConnection(function(err,conn){
        if(err){
          callback(err,null,null);
        }else{
          conn.query(sql,params,function(err,vals,fields){
              //释放连接
              conn.release();
              //事件驱动回调
              err? callback(err) : callback(vals);
          });
        }
      });
    }
}